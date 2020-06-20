var express = require("express"),
    mongoose = require("mongoose"),
    request = require("request"),
    methodOverride = require("method-override"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    passportLocalMongooe = require("passport-local-mongoose");

var app = express();

mongoose.connect("mongodb://localhost/hospital", { useNewUrlParser: true, useUnifiedTopology: true });
//models
var User = require("./models/user.js"),
    Hospital = require("./models/hospital.js"),
    Comment = require("./models/comment.js");


//routes require
var hospitalRoutes = require("./routes/hospital"),
    indexRoutes = require("./routes/index"),
    userRoutes = require("./routes/user"),
    doctorRoutes = require("./routes/doctor"),
    supplierRoutes = require("./routes/supplier");


app.set("view engine", "ejs");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

//passport

app.use(require("express-session")({
    secret: "I have become an expert developer",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//res.locals
app.use(function(req, res, next) {
    res.locals.currUser = req.user;
    //console.log("hello i am police " + req.user);
    next();
});


//Routes
app.use(hospitalRoutes);
app.use(indexRoutes);
app.use(userRoutes);
app.use(doctorRoutes);
app.use(supplierRoutes);

// app.get("/", function(req, res) {
//     res.redirect("/hospital");
// })

// //hospital
// app.get("/hospital", function(req, res) {


//         console.log("yo!!  " + req.user);
//         //res.render("hospital/hospital");
//         Hospital.find({}, function(err, hospitalArr) {
//             if (err) {

//             } else {
//                 res.render("hospital/hospital", { hospitalArr: hospitalArr });
//                 // res.send("hi");
//             }
//         })

//     })
//     //hospital/new
// app.get("/hospital/new", isloggedin, function(req, res) {

//         console.log("yo!! " + req.user);
//         res.render("hospital/new");

//     })
//     //hospital/create

// app.post("/hospital/", isloggedin, function(req, res) {

//         console.log("yo!! " + req.user);
//         var hospital = new Hospital({
//             name: req.body.name,
//             picture: req.body.picture,
//             video: req.body.video,
//             content: req.body.content,
//             authorName: req.user.name,
//             author: req.user
//         });

//         Hospital.create(hospital, function(err, hospital) {
//             if (err)
//                 console.log(err);
//             else {
//                 res.redirect("/hospital");
//             }
//         })

//     })
//     //hospital-show
// app.get("/hospital/:hospital_id/show", function(req, res) {
//     Hospital.findById(req.params.hospital_id, function(err, hospital) {

//         if (err) {
//             res.redirect("/hospital#" + hospital._id);
//         } else {
//             res.render("hospital/show", { hospital: hospital });
//         }
//     });
// });
// //hospital-edit
// app.get("/hospital/:hospital_id/show", function(req, res) {
//     Hospital.findById(req.params.hospital_id, function(err, hospital) {

//         if (err) {
//             res.redirect("/hospital#" + hospital._id);
//         } else {
//             res.render("hospital/show", { hospital: hospital });
//         }
//     });
// });
// //hospital-delete
// app.delete("/hospital/:hospital_id", function(req, res) {
//     Hospital.findByIdAndDelete(req.params.hospital_id, function(err) {

//         if (err) {
//             res.redirect("/hospital");
//         } else {
//             res.redirect("/hospital");
//         }
//     });
// });

// //hospital rate
// app.post("/hospital/:hospital_id/like", isloggedin, function(req, res) {
//     Hospital.findById(req.params.hospital_id, function(err, hospital) {

//         if (err) {
//             res.redirect("/hospital#" + hospital._id);
//         } else {
//             hospital.likesNo = hospital.likesNo + 1;
//             var flag = 1;
//             hospital.likes.forEach(function(str) {
//                 if (str == req.user.name) {
//                     flag = 0;
//                 }
//             })
//             if (flag == 1) {
//                 hospital.likes.push(req.user.name);
//                 hospital.save(function(err, hospital) {
//                     if (err) {
//                         console.log(err);
//                         res.redirect("back");
//                     } else
//                         res.redirect("back");
//                 });
//             } else
//                 res.redirect("back");
//         }
//     });
// });
// //hospital comment 
// app.post("/hospital/:hospital_id/comment", isloggedin, function(req, res) {
//     Hospital.findById(req.params.hospital_id, function(err, hospital) {
//         if (err) {
//             console.log(err);
//             res.redirect("/hospital#" + hospital._id);
//         } else {
//             if (req.body.content == "")
//                 return res.redirect("/hospital#" + hospital._id);
//             else {
//                 hospital.commentNo = hospital.commentNo + 1;
//                 hospital.comment.push(new Comment({
//                     authorName: req.user.name,
//                     content: req.body.content,
//                     author: req.user
//                 }));
//                 hospital.save(function(err, hospital) {
//                     if (err) {
//                         console.log(err);
//                         res.redirect("back");
//                     } else
//                         res.redirect("back");
//                 });

//             }
//         }
//     });
// });

// //hospital comment  delete
// app.delete("/hospital/:hospital_id/comment/:comment_id", isloggedin, function(req, res) {
//     console.log("delete comm")
//     hospital_id = req.params.hospital_id;
//     comment_id = req.params.comment_id;
//     Hospital.findById(hospital_id, function(err, hospital1) {
//         console.log("yo hospital")
//         if (err) {
//             console.log(err);
//             res.redirect("/hospital#" + hospital1._id);
//         } else {
//             console.log("found hospital")
//             var flag = 0;
//             hospital1.comment.forEach(function(comment) {

//                 console.log(req.user, comment.author)
//                 if (req.user.equals(comment.author)) {
//                     flag = 1;
//                     console.log("flag 1")
//                     hospital1.commentNo = hospital1.commentNo - 1;

//                     //hospital.updateOne( {_id: hospital_id}, { $pullAll: {uid: [comment_id] } } )
//                     hospital1.comment.pull({ _id: comment_id });
//                     hospital1.save(function(err, hospital1) {
//                         if (err)
//                             console.log("err")
//                         else {
//                             console.log("deleted")
//                             return res.redirect("back")
//                         }
//                     })

//                 }

//             })
//         }

//     });
// });



// //login

// app.get("/login", function(req, res) {
//     res.render("login");
// });

// app.post("/user/login/", passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/"
// }), function(req, res) {});

// //logout

// app.get("/user/logout", function(req, res) {
//     req.logout();
//     res.redirect("/");
// });

// //signup
// //new
// app.get("/signup", function(req, res) {
//     res.render("signup");
// });
// //create
// app.post("/user/signup/", function(req, res) {

//     User.register(new User({
//         name: req.body.name,
//         username: req.body.username,
//         usertype: req.body.signupAs
//     }), req.body.password, function(err, user) {
//         if (err) {
//             console.log(err);
//             res.redirect("/");
//         } else {
//             passport.authenticate("local")(req, res, function() {
//                 res.redirect("/");
//             });
//         }
//     });

// })

// //isloggedin
// function isloggedin(req, res, next) {
//     if (req.isAuthenticated())
//         next();
//     else {
//         res.redirect("/login");
//     }
// }




//listen

app.listen(3000, function() {
    console.log("Server started!......");
})