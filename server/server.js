const cors = require("cors");
const cookieParser = require("cookie-parser");

const express = require("express");
const path = require("path");
const { logger } = require("./middlewares/logger");
const { logEvents } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();
const connectDB = require("./config/dbConn");

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ["http://localhost:5173"];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

const app = express();
app.use(logger);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

const petRoutes = require("./routes/petRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/user", userRoutes);
app.use("/pet", petRoutes);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log("Successfully connected to the server"));
  })
  .catch((err) => {
    console.log(err);
    logEvents(
      `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
      "mongoErrLog.log"
    );
  });
