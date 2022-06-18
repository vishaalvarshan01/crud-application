const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = 3005;

// Server configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to DB
const url = "mongodb://localhost:27017/test";
mongoose.connect(url, { useNewUrlParser: true });

// Data Schema
const itemSchema = {
  title: String,
  description: String,
};

// Data model
const Item = mongoose.model("Item", itemSchema);

// Read route
app.get("/items", (req, res) => {
  Item.find()
    .then((items) => res.json(items))
    .catch((error) => res.sendStatus(400).json("Error : ", error));
});

// create route
app.post("/newitem", (req, res) => {
  const newItem = new Item({
    title: req.body.title,
    description: req.body.description,
  });
  newItem
    .save()
    .then((item) => console.log(item))
    .catch((error) => res.sendStatus(400).json("Error : ", error));
});

// delete route
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  Item.findByIdAndDelete({ _id: id }, (req, res, err) => {
    if (!err) console.log("Item deleted");
    else console.log(err);
  });
});

// update route
app.put("/put/:id", (req, res) => {
  const id = req.params.id;
  const updatedItem = {
    title: req.body.title,
    description: req.body.description,
  };
  Item.findByIdAndUpdate({ _id: id }, { $set: updatedItem }, (req, res, err) => {
    if (!err) console.log("item updated");
    else console.log(err);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
