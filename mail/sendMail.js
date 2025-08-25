const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();
async function sendWelcomeEmail() {
   

     const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
       user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
});
const info = await transporter.sendMail({
        from:  process.env.EMAIL_USER,
        to: "dr1332616@gmail.com",
        subject: "Hello Register",
        text: "Hello! Registration done successfully",
        html: "<h1>Hello!</h1><p>Registration done successfully</p>"
    })
    console.log("Message sent:", info.messageId);
}
module.exports = sendWelcomeEmail;