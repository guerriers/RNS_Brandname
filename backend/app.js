require("dotenv").config();
const express = require('express');
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
const User = require("./models/user");
const productRoutes = require('./routes/productRoutes');
const userVerifyRoutes = require('./routes/userVerifyRoutes');
const app = express();
const cookieParser = require("cookie-parser");
const { errorHandler, sequelizeErrorHandler } = require("./middlewares/errorHandlers");
const {isAuthenticatedUser} = require("./middlewares/auth");
const fileUpload = require('express-fileupload'); 
app.use(fileUpload());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: "150mb" }));
app.use(express.urlencoded({ limit: "150mb", extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/userVerify', userVerifyRoutes);

// Middleware to handle errors
app.use(sequelizeErrorHandler);
app.use(errorHandler);

module.exports = app;