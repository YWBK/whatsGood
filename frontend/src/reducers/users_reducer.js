import {
  RECEIVE_USER,
  REMOVE_USER,
  REMOVE_LIST_FOLLOW,
  ADD_LIST_FOLLOW,
  ADD_USER_FOLLOW,
} from "../actions/user_actions";
import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_LOGOUT,
  RECEIVE_USER_SIGN_IN
} from '../actions/session_actions';

const UsersReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = Object.assign({}, oldState);

  switch (action.type) {
    case RECEIVE_USER:

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

      return newState;
    case REMOVE_USER:
      newState[action.data.userId].followingUsers = newState[
        action.data.userId
      ].followingUsers.filter(
        (user) => user.id !== action.data.userIdBeingFollowed
      );

      return newState;
    case ADD_USER_FOLLOW:

      let newlyFollowedUser = {
        id: newState[action.data.userBeingFollowedId].id,
        username: newState[action.data.userBeingFollowedId].username,
      };

      newState[action.data.userId].followingUsers.push(newlyFollowedUser);

      return newState;
    case REMOVE_LIST_FOLLOW:
      const listId = action.data.listId;

      newState[action.data.userId].followingLists = newState[
        action.data.userId
      ].followingLists.filter((id) => id !== listId);

      return newState;
    case ADD_LIST_FOLLOW:

      newState[action.data.userId].followingLists.push(action.data.listId);

      return newState;
    case RECEIVE_USER_LOGOUT:
      return {};
    default:
      return oldState;
  }
};

export default UsersReducer;
