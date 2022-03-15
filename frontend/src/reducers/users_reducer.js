import { RECEIVE_USER } from "../actions/user_actions";

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

      for (let list of action.user.data.followingLists) {
        newUser.followingLists.push(list._id);
      }

      newState[newUser.id] = newUser;

      // debugger;
      return newState;
    default:
      return oldState;
  }
};

export default UsersReducer;
