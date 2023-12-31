const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const path = require("path");
const cloudinary = require("cloudinary");
const userRouter = require("./routes/userRoute");
const informationRoute = require("./routes/informationRoute");
const educationRoute = require("./routes/educationRoute");
const experienceRoute = require("./routes/experienceRoute");
const projectRoute = require("./routes/projectRoute");
const skillRoute = require("./routes/skillRoute");
const blogRoute = require("./routes/blogRoute");

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "https://mdmahadihasan.vercel.app",

    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  "/api/v1",
  userRouter,
  informationRoute,
  educationRoute,
  experienceRoute,
  skillRoute,
  projectRoute,
  blogRoute
);

app.get("/", (req, res) => {
  res.send("Hello world from portfolio backend server!");
});

// Server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.NODE_MODE} Mode on port ${port}`.bgCyan
      .black
  );
});
