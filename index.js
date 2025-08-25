const express= require('express')
const cors = require('cors')
const dotenv= require('dotenv')
const {connectdb}= require('./connectDB/connectDB')
dotenv.config();
const cookieParser = require('cookie-parser');
const UserRoutes = require('./routes/userRoutes.js');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cors());
app.use(cookieParser());

app.use("/api/auth",UserRoutes);
const BlogRoutes = require('./routes/upload.routes.js');
app.use("/api", BlogRoutes);

app.listen(PORT, () => {
	connectdb();
	console.log("Server is running on port: ", PORT);
});