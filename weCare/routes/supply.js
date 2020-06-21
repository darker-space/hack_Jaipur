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
            Supply.find({}, function(err, supplyArr) {
                if (err) {
                    res.redirect("/")
                } else {
                    res.render("supply/show", { hospitalArr: hospitalArr, supplyArr: supplyArr });
                }
            });
        }

    })


})
router.get("/supply/require", function(req, res) {
    Hospital.find({}, function(err, hospitalArr) {
        if (err) {
            res.redirect("/")
        } else {
            res.render("supply/require", { hospitalArr: hospitalArr });

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

//new2 
router.get("/supply/sell", isloggedin, function(req, res) {
    if (req.user.userType == "owner" || req.user.userType == "supplier") {
        res.render("supply/new2");
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


//craete2
router.post("/supply/sell", isloggedin, function(req, res) {
    if (req.user.userType == "supplier") {

        console.log("*******", req.body.s)
        req.body.s.type = "Sell";
        req.body.s.author = req.user.name;
        req.body.s.author_id = req.user._id;
        req.body.s.phoneNo = req.user.phoneNo;
        console.log("*******", req.body.s)
        Supply.create(req.body.s, function(err) {
            if (err)
                console.log(err);
            else {
                res.redirect("/supply/view");
            }
        })


    } else {
        res.redirect("back");
    }

});



//supply delete1

router.delete("/hospital/:hospital_id/supply/:supply_id", isloggedin, function(req, res) {
    hospital_id = req.params.hospital_id;
    supply_id = req.params.supply_id;
    Hospital.findById(hospital_id, function(err, hospital1) {

        hospital1.demand.forEach(function(supply) {

            if (supply._id == supply_id) {

                hospital1.demand.pull({ _id: supply_id });
                hospital1.save(function(err, hospital1) {
                    if (err)
                        console.log("err")
                    else {
                        console.log("deleted")
                        return res.redirect("back")
                    }
                })

            }

        })
    });
});


//supply delete 2

router.delete("/supply/del/:supply_id", isloggedin, function(req, res) {
    Supply.findByIdAndDelete(req.params.supply_id, function(err) {
        if (err)
            console.log(err);
        else {
            res.redirect("back");
        }
    })

})

//isloggedin
function isloggedin(req, res, next) {
    if (req.isAuthenticated())
        next();
    else {
        res.redirect("/login");
    }
}

module.exports = router;