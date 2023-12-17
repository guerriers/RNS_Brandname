const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const User = require("./models/user");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const userVerifyRoutes = require("./routes/userVerifyRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const app = express();
// const helmet = require("helmet");

// const { Server } = require("socket.io");
// const server = require("http").createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "https://localhost:3000",
//     credentials: "true",
//   },
// });
// app.use(helmet());
// app.use(
//   cors({
//     origin: "https://localhost:3000",
//     credentials: "true",
//   })
// );
// app.use(express.json());

// io.on("connect", (socket) => {});

const cookieParser = require("cookie-parser");
const {
  errorHandler,
  sequelizeErrorHandler,
} = require("./middlewares/errorHandlers");
const { isAuthenticatedUser } = require("./middlewares/auth");
const fileUpload = require("express-fileupload");
app.use(fileUpload());
app.use(
  cors({
    origin: "http://localhost:3000",
    // origin: ["https://rnsbrandname.vercel.app","https://rnsbrandname-api.vercel.app"],
    credentials: true,
  })
);
app.use(express.json({ limit: "150mb" }));
app.use(express.urlencoded({ limit: "150mb", extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/userVerify", userVerifyRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

// Middleware to handle errors
app.use(sequelizeErrorHandler);
app.use(errorHandler);

module.exports = app;
