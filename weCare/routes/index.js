var express = require("express");
var router = express.Router();
var passport = require("passport");

//models require

var User = require("../models/user.js"),
    Hospital = require("../models/hospital.js"),
    Comment = require("../models/comment.js");

//root
router.get("/", function(req, res) {
    res.redirect("/hospital");
})

//login

router.get("/login", function(req, res) {
    res.render("user/login");
});

router.post("/user/login/", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
}), function(req, res) {});

//logout

router.get("/user/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

//signup
//new
router.get("/signup", function(req, res) {
    res.render("user/signup");
});
//create
router.post("/user/signup/", function(req, res) {

    User.register(new User({
        name: req.body.name,
        username: req.body.username,
        usertype: req.body.signupAs
    }), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect("/");
            });
        }
    });

})

//isloggedin
function isloggedin(req, res, next) {
    if (req.isAuthenticated())
        next();
    else {
        res.redirect("user/login");
    }
}





module.exports = router;