const express = require("express");
const mongoose = require("mongoose");
const router = require("./controllers");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

class App {
  constructor() {
    this.app = express();
    this.setDB();
    this.setMiddleWare();
    this.setRouter();
    this.set404Error();
    this.setError();
  }
  setDB() {
    mongoose
      .connect("mongodb://52.79.240.76:27017/admin", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        ignoreUndefined: true,
        useFindAndModify: false,
        user: process.env.DB_USER,
        pass: process.env.DB_PASSWORD,
      })
      .then(() => console.log("db connected"))
      .catch((err) => console.log(err));
  }
  setMiddleWare() {
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
  }
  setRouter() {
    this.app.use(router);
    this.app.get("/", (req, res) => {
      res.send("hello");
    });
  }
  set404Error() {
    this.app.use((req, res, _) => {
      res.status(404).send("404");
    });
  }
  setError() {
    this.app.use((err, req, res, _) => {
      console.log(err);
      res.status(500).send("500");
    });
  }
}

module.exports = new App().app;
