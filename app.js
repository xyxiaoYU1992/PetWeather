var path = require("path");
var express = require("express");
var zipdb = require("zippity-do-dah");
var DarkSky = require("dark-sky");
var app = express();
var DarkSky = "https://api.darksky.net/forecast/3211cb372b92b0d9c6fe595fcaa36a9d/";

app.use(express.static(path.resolve(__dirname, "public")));
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("index");
});

app.get(/^\/(\d{5})$/, function(req, res, next) {
    var zipcode = req.params[0];
    var location = zipdb.zipcode(zipcode);
    if (!location.zipcode) {
        next();
        return;
    }
    
    var latitude = location.latitude;
    var longitude = location.longitude;
    DarkSky.concat(latitude, longitude, function(err, data) {
        if (err) {
            next();
            return;
        }

        res.json({
            precipProbability: data.currently.precipProbability
        });
    });
});

app.use(function(req, res) {
    res.status(404).render("404");
});

app.listen("3000",function(){
    console.log("Server started");
})