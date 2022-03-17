import React from "react";
import Button from "@mui/material/Button";

const ItemsShowItem = (props) => {
  const item = props.item ? props.item.volumeInfo : null;

  const itemDisplay = item ? (
    <div className="items-show-item">
      <div>
        <p>Title: </p>
        <p className="items-show-item__title">{item.title}</p>
      </div>
      <div>
        <p>Author(s): </p>
        <ul>
          {item.authors.map((author, index) => (
            <li key={index} className="items-show-item__author">
              {author}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p>Year Published: </p>
        <p className="items-show-item__date">{item.publishedDate}</p>
      </div>
      <div>
        <p>Categories: </p>
        <ul>
          {item.categories.map((category, index) => (
            <li key={index} className="items-show-item__category">
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="items-show-item__pct">
          <b>90%</b> of the users you follow have this book in their lists.
        </p>
      </div>
      <div>
        <Button variant="outlined" size="small">
          Synopsis
        </Button>
      </div>
    </div>
  ) : (
    ""
  );

  return <div className="items-show-item__container">{itemDisplay}</div>;
};

export default ItemsShowItem;
