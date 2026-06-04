const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");

const authRouter = require("./routes/auth");
const dealsRouter = require("./routes/deals");
const tipsRouter = require("./routes/tips");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Konfiguracja bazy danych
mongoose
  .connect("mongodb://localhost/Projekt")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  }),
);

app.use("/auth", authRouter);
app.use("/deals", dealsRouter);
app.use("/tips", tipsRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  res.status(err.status || 500).json({
    error: err.message || "Wystąpił błąd serwera",
  });
});

module.exports = app;
