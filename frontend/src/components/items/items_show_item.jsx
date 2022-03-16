import React from "react";

const ItemsShowItem = () => {
  return (
    <div>
      <div>
        <p>Title: </p>
        <p>item.title</p>
      </div>
      <div>
        <p>Author</p>
        <p>item.author</p>
      </div>
      <div>
        <p>Year Published: </p>
        <p>item.year</p>
      </div>
      <div>
        <p>Categories</p>
        <p>item.mainCategories</p>
      </div>
      <div>
        <p>Synopsis</p>
        <p>item.synopsis</p>
      </div>
    </div>
  );
};

export default ItemsShowItem;
