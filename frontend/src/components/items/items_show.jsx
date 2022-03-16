import React, { useEffect, useState } from "react";
import ItemsShowItem from "./items_show_item";
import ItemsShowRatings from "./items_show_ratings";
import { fetchSingleBook } from "../../util/search_util";
import { useLocation } from "react-router-dom";

const ItemsShow = (props) => {
  const [item, setItem] = useState(null);

  const location = useLocation();
  const { volumeId } = props.location.state;

  //   debugger;
  useEffect(() => {
    debugger;
    fetchSingleBook(volumeId).then((book) => console.log(book));
  }, []);

  return (
    <div>
      <ItemsShowItem />
      <ItemsShowRatings />
    </div>
  );
};

export default ItemsShow;
