import React from "react";
// import Button from "@mui/material/Button";
import ItemsShowSynopsis from "./items_show_synopsis";

const ItemsShowItem = (props) => {
  // debugger;
  const item = props.item ? props.item.volumeInfo : null;
  const popScore = props.popScore ? props.popScore : "0%";
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
  const hasAuthors = !!item?.authors;

  const itemDisplay = item ? (
    <div className="items-show-item">
      <div>
        <p>Title: </p>
        <p className="items-show-item__title">{item.title}</p>
      </div>
      <div>
        <p>Author(s): </p>
        <ul>
          {hasAuthors &&
            item.authors.map((author, index) => (
              <li key={index} className="items-show-item__author">
                {author}
              </li>
            ))}
          {!hasAuthors && <li>anonymous author</li>}
        </ul>
      </div>
      <div>
        <p>Year Published: </p>
        <p className="items-show-item__date">{item.publishedDate}</p>
      </div>
      <div>
        <p>{item.categories ? "Categories:" : ""}</p>
        <p className="items-show-item__category">
          {item.categories ? item.categories[0] : ""}
        </p>
      </div>
      <div>
        <p className="items-show-item__pct">
          <b>{popScore}%</b> of the users you follow have this book in their
          lists.
        </p>
      </div>
      <div>
        {/* <Button variant="outlined" size="small">
          Synopsis
        </Button> */}
        {item.description && (
          <ItemsShowSynopsis synopsis={item.description ?? ""} />
        )}
      </div>
    </div>
  ) : (
    ""
  );

  return <div className="items-show-item__container">{itemDisplay}</div>;
};

export default ItemsShowItem;
