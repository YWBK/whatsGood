import React, { useEffect } from "react";
import "./user_show.css";

const UserShow = (props) => {
  useEffect(() => props.fetchUser(props.match.params.userId), []);
  // fetch lists based on user and change otherUserView and loggedInUserView to populate data
  // adjust following constants to account for fetched data

  // const userLists =
  //   props.user && props.user.lists ? (
  //     props.user.lists.map((list) => {
  //       <li>
  //         <p>{list.followCount}</p>
  //         <p>{list.listName}</p>
  //         {props.user.id !== props.currentUser.id ? (
  //           props.currentUser.followedLists.includes(list.id) ? (
  //             <button>Unfollow</button>
  //           ) : (
  //             <button>Follow</button>
  //           )
  //         ) : (
  //           ""
  //         )}
  //       </li>;
  //     })
  //   ) : (
  //     <div></div>
  //   );

  // const otherUserView = props.user ? (
  //   <div>
  //     {props.currentUser.followedUsers.includes(props.user.id) ? (
  //       <button>Unfollow {props.user.username}</button>
  //     ) : (
  //       <button>Follow {props.user.username}</button>
  //     )}
  //     <div>{props.user.username}'s lists</div>
  //     <ul>{userLists}</ul>
  //   </div>
  // ) : (
  //   <div></div>
  // );

  // const loggedInUserView = props.user ? (
  //   <div>
  //     <p>{props.user.username}'s lists</p>
  //     <ul>{userLists}</ul>
  //   </div>
  // ) : (
  //   <div></div>
  // );

  return (
    <div className="user-show__container">
      {/* {props.user && props.currentUser.id === props.user.id
        ? { loggedInUserView }
        : { otherUserView }} */}
    </div>
  );
};

export default UserShow;
