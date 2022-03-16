import React from "react";
import "./items_show_item.css";

const ItemsShowItem = (props) => {
  const item = props.item ? props.item.volumeInfo : null;

  const itemDisplay = item ? (
    <div className="items-show-item">
      <div>
        <p>Title: </p>
        <p>{item.title}</p>
      </div>
      <div>
        <p>Author(s): </p>
        <ul>
          {item.authors.map((author, index) => (
            <li key={index}>{author}</li>
          ))}
        </ul>
      </div>
      <div>
        <p>Year Published: </p>
        <p>{item.publishedDate}</p>
      </div>
      <div>
        <p>Categories: </p>
        <ul>
          {item.categories.map((category, index) => (
            <li key={index}>{category}</li>
          ))}
        </ul>
      </div>
      <div>
        <input type="button" value="Synopsis" />
      </div>
    </div>
  ) : (
    ""
  );

  return <div className="items-show-item__container">{itemDisplay}</div>;
};

export default ItemsShowItem;
