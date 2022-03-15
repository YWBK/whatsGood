import React, { useState, useEffect } from "react";

import "./user_show.css";

const UserShow = (props) => {
  const [currUser, setCurrUser] = useState(null);

  useEffect(() => {
    props.fetchUser(props.match.params.userId).then((user) => setCurrUser(user));
  }, []);

  return (
    <div className="user-show__container">
      <div>UserShow</div>
    </div>
  );
};

export default UserShow;
