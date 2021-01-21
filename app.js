const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

let items = [];
let workItems = [];

app.set("view engine", "ejs"); 

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {

    //let day = date.getDay();
    let day = date.getDate();

    res.render("list", {listTitle: day, newlistItems: items});
});

app.post("/", (req, res) => {

    let item = req.body.listItem

    if (req.body.list === "Work List") {
        workItems.push(item);
        res.redirect("/work");
    } else {
    items.push(item);
    res.redirect("/");
    }
});

app.get("/work", (req, res) => {
    res.render("list", {listTitle: "Work List", newlistItems: workItems});
});

app.post("/work", (req, res) => {
    let item = req.body.listItem
    
    workItems.push(item);

    res.redirect("/work");
});

app.listen(3000, () => {
    console.log("Server up at port 3000")
});