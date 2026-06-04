var express = require("express");
var router = express.Router();

router.get("/about", function (req, res, next) {
  res.render("about", {
    layout: "./Layouts/layout",
    title: "About",
    welcome: "Hello World!",
  });
});

module.exports = router;
