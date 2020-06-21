var express = require("express");
var router = express.Router();



var User = require("../models/user.js"),
    Hospital = require("../models/hospital.js"),
    Supply = require("../models/supply.js")


//view
router.get("/supply/view", function(req, res) {
    Hospital.find({}, function(err, hospitalArr) {
        if (err) {
            res.redirect("/")
        } else {
            res.render("supply/show", { hospitalArr: hospitalArr });

        }
    })

})

//new
router.get("/hospital/:hospital_id/demand", isloggedin, function(req, res) {
    if (req.user.userType == "owner" || req.user.userType == "supplier") {
        res.render("supply/new", { hospital_id: req.params.hospital_id });
    } else
        res.redirect("back");

});

//create

router.post("/hospital/:hospital_id/", isloggedin, function(req, res) {
    if (req.user.userType == "owner" || req.user.userType == "supplier") {
        Hospital.findById(req.params.hospital_id, function(err, hospital) {
            if (err)
                console.log("err");
            else {
                var ss = req.body.s;

                if (req.user.userType == "owner")
                    ss.type = "Demand";
                else
                    ss.type = "Sell";

                hospital.demand.push(new Supply(ss));
                hospital.save(function(err, hospital) {
                    if (err) {
                        console.log(err);
                        res.redirect("back");
                    } else
                        res.redirect("/");
                });
            }
        })
    } else
        res.redirect("back");

});


//isloggedin
function isloggedin(req, res, next) {
    if (req.isAuthenticated())
        next();
    else {
        res.redirect("/login");
    }
}

module.exports = router;