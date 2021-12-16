const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const LocalStorage = require('node-localstorage').LocalStorage;
const cors = require("cors");
localStorage = new LocalStorage('./scratch');

const app = express();

app.set('view engine', 'ejs');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render('home');
});

app.get("/new", function(req, res){
    res.render('new');
});
app.post("/new", function(req,res){
    const key =  req.body.title;

    const task = {
        title: req.body.title,
        description: req.body.des,
        date: req.body.date
    }

    localStorage.setItem(key,JSON.stringify(task));
    res.redirect("/new");
});

app.get("/inprogress", function(req, res){
    res.render("inprogress");
});

app.post("/inprogress", function(req, res){
    
    const t = req.body.tit;
    const task = JSON.parse(localStorage.getItem(t));
    localStorage.removeItem(t);
    localStorage.setItem("inprog"+t, JSON.stringify(task));
    res.redirect("/inprogress");
});

app.get("/complete", function(req, res){
res.render("complete");
});

app.post("/complete", function(req, res){
    const t = req.body.titr;
    const task = JSON.parse(localStorage.getItem("inprog"+t));
    localStorage.removeItem("inprog"+t);
    localStorage.setItem("comp"+t, JSON.stringify(task));
    res.redirect("/complete");
});

app.get("/archive", function(req, res){
    res.render("archive");
});


app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000");
});