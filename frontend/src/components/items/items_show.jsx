import React, { useEffect, useState } from "react";
import ItemsShowItem from "./items_show_item";
import ItemsShowRatings from "./items_show_ratings";
import { fetchSingleBook } from "../../util/search_util";

const ItemsShow = (props) => {
  const [item, setItem] = useState(null);

  useEffect(() => {
    // fetchSingleBook(volumeId).then((book) => console.log(book));
    fetchSingleBook(props.match.params.itemId).then((book) => console.log(book));
  }, []);

  return (
    <div>
      <ItemsShowItem />
      <ItemsShowRatings />
    </div>
  );
};

export default ItemsShow;
