import { RECEIVE_USER } from "../actions/user_actions";

const UsersReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = Object.assign({}, oldState);

  switch (action.type) {
    case RECEIVE_USER:
      const newUser = action.user.data;

      newUser.id = action.user.data._id;
      delete newUser._id;
      newState[newUser.id] = newUser;

      // debugger;
      return newState;
    default:
      return oldState;
  }
};

export default UsersReducer;