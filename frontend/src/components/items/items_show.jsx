import React, { useEffect, useState } from "react";
import ItemsShowItem from "./items_show_item";
import { fetchSingleBook } from "../../util/search_util";
import Button from "@mui/material/Button";
import "./items_show.css";

const ItemsShow = (props) => {
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetchSingleBook(props.match.params.itemId).then((book) => {
      setItem(book.data);
      console.log(book);
    });
  }, [props.match.params.itemId]);

  return (
    <div className="items-show__container">
      <div className="items-show">
        <ItemsShowItem item={item} />
        <Button
          variant="contained"
          sx={{ marginTop: "2em", width: "max-content" }}
          size="medium"
        >
          Add to list
        </Button>
      </div>
    </div>
  );
};

export default ItemsShow;
