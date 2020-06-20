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
    res.locals.userType;
    if (req.user)
        res.locals.userType = req.user.userType;
    //console.log("hello i am police " + req.user);
    next();
});


//Routes
app.use(hospitalRoutes);
app.use(indexRoutes);
app.use(userRoutes);
app.use(doctorRoutes);
app.use(supplierRoutes);


//listen

app.listen(3000, function() {
    console.log("Server started!......");
})