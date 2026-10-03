const express = require("express");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Blog Management System API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

module.exports = app;