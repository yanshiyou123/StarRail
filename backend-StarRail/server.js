const express = require("express");
const cookieParser = require('cookie-parser')
const session = require("express-session");
const flash = require("express-flash");
const cors = require("cors");

const passport = require("passport");
const app = express();
const PORT = process.env.PORT || 5000;

const mongoose = require("mongoose");
require('./config/passport')(passport);

const charactersRouter = require("./routes/characters");
const usersRouter = require("./routes/users");
const employeesRouter = require("./routes/employees");

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://yanshiyou:ysy64033152@starrail.ricb06f.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });


// Middleware for Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({ secret: "mySecretKey", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cors());


// Route handler for the root path
app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

app.use("/api/characters", charactersRouter);
app.use("/api/users", usersRouter);
app.use("/api/employees", employeesRouter);

app.use((req, res) => {
  res.status(404).send("404: Page not found");
});
