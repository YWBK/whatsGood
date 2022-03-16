import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./user_show.css";

const UserShow = (props) => {
  useEffect(() => props.fetchUser(props.match.params.userId), []);

  const userLists = props.userLists ? (
    props.userLists.map((list) => {
      return (
        <Link key={list.id} to={`/lists/${list.id}`}>
          <li className="user-show__li">
            <p>{list.followers.length} follows</p>
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
        </Link>
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
      <ul className="user-show__list-container">{userLists}</ul>
    </div>
  ) : (
    console.log("no other user")
  );

  const loggedInUserView = props.user ? (
    <div>
      <h1>{props.user.username}'s lists</h1>
      <ul className="user-show__list-container">{userLists}</ul>
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
