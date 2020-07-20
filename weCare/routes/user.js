var express = require("express");
var router = express.Router();

//models require

var User = require("../models/user.js"),
    Hospital = require("../models/hospital.js"),
    Comment = require("../models/comment.js");

router.get("/user/hospital", function(req, res) {
    Hospital.find({}, function(err, hospitalArr) {
        if (err) {
            res.redirect("/")
        } else {
            res.render("hospital/yourHosp", { hospitalArr: hospitalArr });

        }
    })

})

router.get("/about", function(req, res) {
    res.render("user/about.ejs");
})


module.exports = router;