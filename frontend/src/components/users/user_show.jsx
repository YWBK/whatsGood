import React, { useEffect } from "react";
import "./user_show.css";

const UserShow = (props) => {
  useEffect(() => props.fetchUser(props.match.params.userId), []);

  const userLists = props.userLists ? (
    props.userLists.map((list) => {
      return (
        <li key={list.id}>
          <p>{list.followers.length}</p>
          <p>{list.name}</p>
          {props.user.id !== props.currentUser.id ? (
            props.currentUser.followingLists.includes(list.id) ? (
              <button>Unfollow</button>
            ) : (
              <button>Follow</button>
            )
          ) : (
            ""
          )}
        </li>
      );
    })
  ) : (
    <div></div>
  );

  const otherUserView = props.user ? (
    <div>
      {props.currentUser.followingUsers.includes(props.user.id) ? (
        <button>Unfollow {props.user.username}</button>
      ) : (
        <button>Follow {props.user.username}</button>
      )}
      <div>{props.user.username}'s lists</div>
      <ul>{userLists}</ul>
    </div>
  ) : (
    console.log("no user")
  );

  const loggedInUserView = props.user ? (
    <div>
      <p>{props.user.username}'s lists</p>
      <ul>{userLists}</ul>
    </div>
  ) : (
    <div></div>
  );

  // debugger;
  return (
    <div className="user-show__container-bg">
      <div className="user-show__container">
        {props.user ? (
          props.currentUser.id === props.user.id ? (
            <div>{loggedInUserView}</div>
          ) : (
            <div>{otherUserView}</div>
          )
        ) : (
          ""
        )}
        {/* <div>{otherUserView}</div> */}
      </div>
    </div>
  );
};

export default UserShow;
