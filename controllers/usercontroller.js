const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/userModel");
const sendWelcomeEmail = require("../mail/sendMail");

dotenv.config();

const registerUser= async(req,res)=>{
    try {
        const { name, email, mobile, password } = req.body;
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser= await User.findOne({ email });
    if(existingUser){
        return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password,10);

    const user = new User({ name, email, mobile, password: hashed });
    await user.save();
    sendWelcomeEmail();
    res.status(201).json({ message: "User Registered Successfully" });
    
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error.", data: error });
    }
}

const loginUser = async (req, res) => {
     try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

   res.status(200).json({ message: "Login Successful", token });

  }
   catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error.", data: error });
  }
};

module.exports = {
  registerUser,
  loginUser
};