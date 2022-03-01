const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const port = process.env.PORT || 4000;
const { isAllow } = require("./middlewares/is-allow");

const Server = {
  start: async () => {
    mongoose
      .connect("mongodb://localhost:27017/dalat")
      .then(() => console.log("connect success"))
      .catch(() => console.log("connect failed"));

    const app = express();
    app.set("view engine", "ejs");
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(
      session({
        secret: "ADMIN_SECRET",
        resave: false,
        saveUninitialized: false,
        cookie: {
          path: "/",
          httpOnly: true,
          secure: false,
          maxAge: 360000000,
        },
      })
    );
    app.use(flash());
    app.use("/public", express.static("public"));
    app.set("views", path.join(__dirname, "../views"));
    app.set("view engine", "ejs");

    require("./routes/auth")({ app });
    require("./routes/file")({ app });
    require("./routes/profile")({ app });

    app.get("/", function (req, res) {
      res.render("index");
    });

    app.get("/admin/profiles", isAllow("admin"), function (req, res) {
      res.render("admin/profiles");
    });

    app.get("/login", function (req, res) {
      res.render("login");
    });

    app.listen(port, () => {
      console.log(`server start at ${port}`);
    });
  },
};

module.exports = Server;
