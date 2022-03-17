import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./user_show.css";

const UserShow = (props) => {
  useEffect(() => {
    // props.fetchUser("623163debe6f6b61d32195c7");
    // debugger
    // const getUserContent = async () => {
    //   await props.fetchUser(props.currentUserId);
    //   props.fetchUser(props.match.params.userId);
    //   return;
    // }

    // getUserContent();
    props.fetchUser(props.currentUserId)
      .then(() => props.fetchUser(props.match.params.userId));
  }, [props.match.params.userId]);
  // useEffect(() => props.fetchUser(props.currentUserId), []);

  // KEEP
  // useEffect(() => {
  //   props.fetchUser(props.match.params.userId);
  // }, [props.match.params.userId]);

  // debugger;

  const followListHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("clicked")
  };

  const userLists =
    props.currentUser && props.user ? (
      props.allLists
        .filter((list) => list.ownerId === props.user.id)
        .map((list) => {
          return (
            <Link key={list.id} to={`/lists/${list.id}`}>
              <li className="user-show__li">
                <p>{list.followers.length} follows</p>
                <p>{list.name}</p>
                {props.user.id !== props.currentUser.id ? (
                  props.currentUser.followingLists.includes(list.id) ? (
                    <button onClick={(e) => followListHandler(e)}>
                      Unfollow
                    </button>
                  ) : (
                    <button onClick={(e) => followListHandler(e)}>
                      Follow
                    </button>
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

  const otherUserView =
    props.currentUser && props.user ? (
      <div>
        {props.currentUser.followingUsers.includes(props.user.id) ? (
          <button className="user-show__follow-unfollow">
            Unfollow {props.user.username}
          </button>
        ) : (
          <button className="user-show__follow-unfollow">
            Follow {props.user.username}
          </button>
        )}
        <h1>{props.user.username}'s lists</h1>
        <ul className="user-show__list-container">{userLists}</ul>
      </div>
    ) : (
      console.log("no other user")
    );

  const loggedInUserView =
    props.currentUser && props.user ? (
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
        {props.user && props.currentUser ? (
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
