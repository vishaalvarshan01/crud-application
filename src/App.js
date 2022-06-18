import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import DisplayUsers from "./DisplayUsers";

function App() {
  const [item, SetItem] = useState({
    title: "",
    description: "",
  });

  const [items, SetItems] = useState([
    {
      _id: "",
      title: "",
      description: "",
    },
  ]);

  const [isPut, SetIsPut] = useState(false);
  const [updatedItem, SetUpdatedItem] = useState({
    title: "",
    description: "",
    id: "",
  });

  useEffect(() => {
    fetch("/items")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => SetItems(jsonRes))
      .catch((error) => console.log(error));
  }, [items]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetItem((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };

  const addItem = (event) => {
    event.preventDefault();
    const newItem = {
      title: item.title,
      description: item.description,
    };
    axios.post("/newitem", newItem);
    console.log(newItem);
    SetItem({
      title: "",
      description: "",
    });
  };

  const deleteItem = (id) => {
    axios.delete("/delete/" + id);
    console.log("deleted item with id ", id);
  };

  const openUpdate = (id) => {
    SetIsPut(true);
    SetUpdatedItem((prevInput) => {
      return {
        ...prevInput,
        _id: id,
      };
    });
  };

  const updateItem = (id) => {
    SetIsPut(false);
    axios.put("/put/" + id, updatedItem);
    console.log("item updated with id", id);
  };

  const handleUpdate = (event) => {
    const { name, value } = event.target;
    SetUpdatedItem((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };

  return (
    <div className="App">
      {!isPut ? (
        <div>
          <input onChange={handleChange} name="title" placeholder="title" value={item.title}></input>
          <input onChange={handleChange} name="description" placeholder="description" value={item.description}></input>
          <button onClick={addItem}>ADD ITEM</button>
        </div>
      ) : (
        <div>
          <input onChange={handleUpdate} name="title" placeholder="title" value={updatedItem.title}></input>
          <input
            onChange={handleUpdate}
            name="description"
            placeholder="description"
            value={updatedItem.description}
          ></input>
          <button onClick={() => updateItem(updatedItem._id)}>Update Item</button>
        </div>
      )}
      <DisplayUsers item={items} />
    </div>
  );
}

export default App;
