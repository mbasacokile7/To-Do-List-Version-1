// Import the libraries

import express from "express";
import bodyParser from "body-parser";

// Set Up App

const app = express();

// Tell the app to use ejs
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// Use get method to send repsonse 

// Get the day and date in local format
let today = new Date();
let options = { weekday: "long", month:"long", day:"numeric", year:"numeric"};
let day = today.toLocaleDateString("en-GB", options);
let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];
let newListItem = "";


app.get("/", function(req, res){
    res.render("list", {listTitle:day, listItem:items});
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work", listItem:workItems});
});

app.post("/", function(req, res){
    console.log(req.body);

    if(req.body.list === "Work"){
        newListItem = req.body.newListItem;
        workItems.push(newListItem);
        res.redirect("/work");
    } else{
        newListItem = req.body.newListItem;
        items.push(newListItem)
        res.redirect("/");
    }
    
    //res.send(newListItem);
});

//Set up port for server to listen on

app.listen(3000, function(){
    console.log("Server is listening on Port 300")
});