// Import the libraries

import express from "express";
import bodyParser from "body-parser";

// Set Up App

const app = express();

// Tell the app to use ejs
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// Use get method to send repsonse 

// Get the day and date in local format
let today = new Date();
let options = { weekday: "long", month:"long", day:"numeric", year:"numeric"};
let day = today.toLocaleDateString("en-GB", options);
let items = ["Buy Food", "Cook Food", "Eat Food"];


app.get("/", function(req, res){
    res.render("list", {dayOfTheWeek:day, listItem:items});
});

app.post("/", function(req, res){
    let newListItem = req.body.newListItem;
    items.push(newListItem)
    res.redirect("/");
    //res.send(newListItem);
});

//Set up port for server to listen on

app.listen(3000, function(){
    console.log("Server is listening on Port 300")
});