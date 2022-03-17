import {
  RECEIVE_USER,
  REMOVE_USER,
  REMOVE_LIST_FOLLOW,
  ADD_LIST_FOLLOW,

} from "../actions/user_actions";

const UsersReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = Object.assign({}, oldState);

  switch (action.type) {
    case RECEIVE_USER:
      // debugger;
      const newUser = {};

      newUser.id = action.user.data._id;
      newUser.username = action.user.data.username;
      newUser.email = action.user.data.email;
      newUser.followingLists = [];
      newUser.followingUsers = [];
      newUser.myLists = [];

      for (let list of action.user.data.followingLists) {
        newUser.followingLists.push(list._id);
      }

      for (let list of action.user.data.followingUsers) {
        newUser.followingUsers.push({ id: list._id, username: list.username });
        // newUser.followingUsers.push(list._id);
      }

      for (let list of action.user.data.myLists) {
        newUser.myLists.push(list._id);
      }

      newState[newUser.id] = newUser;

      // debugger;
      return newState;
    case REMOVE_USER:

      newState[action.data.userId].followingUsers = newState[
        action.data.userId
      ].followingUsers.filter(
        (user) => user.id !== action.data.userIdBeingFollowed
      );

      return newState;
    case REMOVE_LIST_FOLLOW:
      // debugger;
      const listId = action.data.listId;

      newState[action.data.userId].followingLists = newState[
        action.data.userId
      ].followingLists.filter((id) => id !== listId);

      // debugger;
      return newState;
    case ADD_LIST_FOLLOW:
      // debugger;

      newState[action.data.userId].followingLists.push(action.data.listId);

      // debugger;
      return newState;
    default:
      return oldState;
  }
};

export default UsersReducer;
