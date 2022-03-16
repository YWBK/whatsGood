import React, { useEffect, useState } from "react";
import ItemsShowItem from "./items_show_item";
import ItemsShowRatings from "./items_show_ratings";
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
        <ItemsShowRatings />
      </div>
      <Button variant="contained" sx={{marginTop: "2em"}}>
        Add to list
      </Button>
    </div>
  );
};

export default ItemsShow;
