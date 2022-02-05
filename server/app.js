const colors = require("colors");
const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const { notFound, errorHandler } = require("./middleware/error");
const connectDB = require("./db");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const requestRouter = require("./routes/request");
const profileRouter = require("./routes/profile");
const notificationsRouter = require("./routes/notification");
<<<<<<< HEAD
const availabilityRouter = require("./routes/availability");
||||||| c9a34f7
=======
const conversationsRouter = require("./routes/conversation");
>>>>>>> 193e2492d69ecf1ea2068e37624b50a5b0f3abe7

const { json, urlencoded } = express;

connectDB();
const app = express();
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("connected");
});

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/profile", profileRouter);
app.use("/requests", requestRouter);
app.use("/notifications", notificationsRouter);
<<<<<<< HEAD
app.use("/availability", availabilityRouter);
||||||| c9a34f7
=======
app.use("/conversations", conversationsRouter);
>>>>>>> 193e2492d69ecf1ea2068e37624b50a5b0f3abe7

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname), "client", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = { app, server };
