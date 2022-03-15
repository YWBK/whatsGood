import React, { useEffect } from "react";
import "./user_show.css";

const UserShow = (props) => {
  useEffect(() => props.fetchUser(props.match.params.userId), []);

  const currUserInfo = props.currUser ? (
    <div>{props.currUser.username}</div>
  ) : (
    <div></div>
  )

  return (
    <div className="user-show__container">
      <div>{currUserInfo}</div>
    </div>
  );
};

export default UserShow;
