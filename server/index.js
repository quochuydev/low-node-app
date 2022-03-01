const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;

const Server = {
  start: async () => {
    const app = express();
    app.set("view engine", "ejs");
    app.use(bodyParser.json());
    app.use(cors());

    mongoose
      .connect("mongodb://localhost:27017/dalat")
      .then(() => console.log("connect success"))
      .catch(() => console.log("connect failed"));

    require("./routes/file")({ app });
    require("./routes/profile")({ app });

    app.get("/", function (req, res) {
      res.render("index");
    });

    app.get("/admin/profiles", function (req, res) {
      res.render("admin/profiles");
    });

    app.listen(port, () => {
      console.log(`server start at ${port}`);
    });
  },
};

module.exports = Server;
