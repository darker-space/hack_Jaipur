var express = require("express");
var router = express.Router();


//models require

var User = require("../models/user.js"),
    Hospital = require("../models/hospital.js"),
    Comment = require("../models/comment.js");


//hospital
router.get("/hospital", function(req, res) {


        console.log("yo!!  " + req.user);
        //res.render("hospital/hospital");
        Hospital.find({}, function(err, hospitalArr) {
            if (err) {

            } else {
                res.render("hospital/hospital", { hospitalArr: hospitalArr });
                // res.send("hi");
            }
        })

    })
    //hospital/new
router.get("/hospital/new", isloggedin, function(req, res) {

        console.log("yo!! " + req.user);
        res.render("hospital/new");

    })
    //hospital/create

router.post("/hospital/", isloggedin, function(req, res) {

        console.log("yo!! " + req.user);
        // var hospital1 = req.body.H;
        req.body.H.author = req.user;
        Hospital.create(req.body.H, function(err, hospital) {
            if (err)
                console.log(err);
            else {
                res.redirect("/hospital");
            }
        })

    })
    //hospital-show
router.get("/hospital/:hospital_id/show", function(req, res) {
    Hospital.findById(req.params.hospital_id, function(err, hospital) {

        if (err) {
            res.redirect("/hospital#" + hospital._id);
        } else {
            res.render("hospital/show", { hospital: hospital });
        }
    });
});
//hospital-edit
router.get("/hospital/:hospital_id/show", function(req, res) {
    Hospital.findById(req.params.hospital_id, function(err, hospital) {

        if (err) {
            res.redirect("/hospital#" + hospital._id);
        } else {
            res.render("hospital/show", { hospital: hospital });
        }
    });
});
//hospital-delete
router.delete("/hospital/:hospital_id", function(req, res) {
    Hospital.findByIdAndDelete(req.params.hospital_id, function(err) {

        if (err) {
            res.redirect("/hospital");
        } else {
            res.redirect("/hospital");
        }
    });
});

//hospital like
router.post("/hospital/:hospital_id/like", isloggedin, function(req, res) {
    Hospital.findById(req.params.hospital_id, function(err, hospital) {

        if (err) {
            res.redirect("/hospital#" + hospital._id);
        } else {
            hospital.likesNo = hospital.likesNo + 1;
            var flag = 1;
            hospital.likes.forEach(function(str) {
                if (str == req.user.name) {
                    flag = 0;
                }
            })
            if (flag == 1) {
                hospital.likes.push(req.user.name);
                hospital.save(function(err, hospital) {
                    if (err) {
                        console.log(err);
                        res.redirect("back");
                    } else
                        res.redirect("back");
                });
            } else
                res.redirect("back");
        }
    });
});
//hospital comment 
router.post("/hospital/:hospital_id/comment", isloggedin, function(req, res) {
    Hospital.findById(req.params.hospital_id, function(err, hospital) {
        if (err) {
            console.log(err);
            res.redirect("/hospital#" + hospital._id);
        } else {
            if (req.body.content == "")
                return res.redirect("/hospital#" + hospital._id);
            else {
                hospital.commentNo = hospital.commentNo + 1;
                hospital.comment.push(new Comment({
                    authorName: req.user.name,
                    content: req.body.content,
                    author: req.user
                }));
                hospital.save(function(err, hospital) {
                    if (err) {
                        console.log(err);
                        res.redirect("back");
                    } else
                        res.redirect("back");
                });

            }
        }
    });
});

//hospital comment  delete
router.delete("/hospital/:hospital_id/comment/:comment_id", isloggedin, function(req, res) {
    console.log("delete comm")
    hospital_id = req.params.hospital_id;
    comment_id = req.params.comment_id;
    Hospital.findById(hospital_id, function(err, hospital1) {
        console.log("yo hospital")
        if (err) {
            console.log(err);
            res.redirect("/hospital#" + hospital1._id);
        } else {
            console.log("found hospital")
            var flag = 0;
            hospital1.comment.forEach(function(comment) {

                console.log(req.user, comment.author)
                if (req.user.equals(comment.author)) {
                    flag = 1;
                    console.log("flag 1")
                    hospital1.commentNo = hospital1.commentNo - 1;

                    //hospital.updateOne( {_id: hospital_id}, { $pullAll: {uid: [comment_id] } } )
                    hospital1.comment.pull({ _id: comment_id });
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
        }

    });
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