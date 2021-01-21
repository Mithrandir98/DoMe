const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs"); 

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const itemSchema = {
    name: String
};

const Item = mongoose.model("Item", itemSchema);

const item1 = Item ({
    name: "Welcome to the ToDo List"
});

const item2 = Item({
    name: "Hit the + button to add new items to the list"
});

const item3 = Item({
    name: "<---- Hit this to delete the item"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [itemSchema]
};

const List = mongoose.model("list", listSchema);

app.get("/", (req, res) => {

    //let day = date.getDate(); or getDay()
    Item.find({}, function(err, foundItems){
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function(err){
                if (err) {
                    console.log(err);
                } else {
                    console.log("Added successfully");
                }
            });
            res.redirect("/");
        } else {
        res.render("list", {listTitle: "Today", newlistItems: foundItems});
        }
    });

    
});

app.post("/", (req, res) => {

    let itemName = req.body.listItem
    const listName = re.body.list;

    const item = new Item({
        name: itemName
    });

    if (listName === "Today"){
        item.save();
        res.redirect("/");
    } else {
        List.findOne({name: listName}, function(err, foundList){
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        });
    }
});

app.post("/delete", (req, res) => {
    const checkedItemID = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemID, function(err){
        if(err) {
            console.log(err);
        } else {
            console.log("Yeeteed successfully");
            res.redirect("/");
        }
    });
});

app.get("/:customListName", (req, res) => {
    const customListName = req.params.customListName;

    List.findOne({name: customListName}, function(err, foundList){
        if (!err) {
            if(!foundList) {
            //Create new list
            const list = new List({
                name: customListName,
                items: defaultItems
            });

            list.save();
            res.redirect("/" + customListName);

            } else {
            //Show existing list
            res.render("list", {listTitle: foundList.name, newlistItems: foundList.items});
            }
        }
    });
});

app.post("/work", (req, res) => {
    let item = req.body.listItem
    
    workItems.push(item);

    res.redirect("/work");
});

app.listen(3000, () => {
    console.log("Server up at port 3000")
});