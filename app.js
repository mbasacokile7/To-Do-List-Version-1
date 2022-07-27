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
let groceryItems = [];
let newListItem = "";


app.get("/", function(req, res){
    res.render("list", {listTitle:day, listItem:items});
});

//Work List
app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work", listItem:workItems});
});

//Grocery List
app.get("/groceries", function(req, res){
    res.render("list", {listTitle: "Groceries", listItem:groceryItems});
});

app.post("/", function(req, res){
    // Check which list we are working on so that we can append the data store accordingly
    switch (req.body.list) {
        case "Work":
            newListItem = req.body.newListItem;
            workItems.push(newListItem);
            res.redirect("/work");
            break;
        
        case "Groceries":
            newListItem = req.body.newListItem;
            groceryItems.push(newListItem);
            res.redirect("/groceries");
            break;
        

        default:
            newListItem = req.body.newListItem;
            items.push(newListItem)
            res.redirect("/");
            break;
    }

    
    //res.send(newListItem);
});

//Set up port for server to listen on

app.listen(3000, function(){
    console.log("Server is listening on Port 300")
});