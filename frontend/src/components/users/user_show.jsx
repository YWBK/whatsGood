import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import "./user_show.css";

const UserShow = (props) => {
  const [currUser, setCurrUser] = useState({
    id: "",
    username: "",
    email: "",
  });

  // useEffect(() => {
  //   props.fetchUser(props.match.params.userId).then((user) => {
  //     return setCurrUser(user.user);
  //   });
  // }, []);

  return (
    <div className="user-show__container">
      <div></div>
    </div>
  );
};

export default UserShow;
