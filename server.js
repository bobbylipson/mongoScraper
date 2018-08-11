//require our dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

//set up our port to be either the host's designated port, or 3000
var PORT = process.env.PORT || 3000;

//instantiate our express app
var app = express();

//set up an express router
var router = express.Router();

//require our routes file pass our router object
require("./config/routes")(router);

//designate our public folder as a static directory
app.use(express.static(__dirname + "/public"));

//connect Handlebars to our Express app
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//use bodyParser in our app
app.use(bodyParser.urlencoded({
    extended: false
}));

//have every request go through our router middleware
app.use(router);

//if deployed, use the deployed database. Otherwise use the local mongoHeadLines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadLines";

//connect mongoose to our database
mongoose.connect(db, function(error) {
    //log any errors connecting with mongoose
    if (error) {
        console.log(error);
    }
    //or log a success message
    else {
        console.log("mongoose connection is successful");
    }
});

//listen on the port
app.listen(PORT, function() {
    console.log("Listening on port:" + PORT);
});