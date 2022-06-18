import React from "react";

function DisplayUsers({ item }) {
  return (
    <div>
      <h1>Movies and Reviews</h1>
      {item.map((item) => {
        return (
          <div key={item._id}>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            {/* <button onClick={""}>Delete</button>
            <button onClick={""}>Update</button> */}
          </div>
        );
      })}
    </div>
  );
}

export default DisplayUsers;
