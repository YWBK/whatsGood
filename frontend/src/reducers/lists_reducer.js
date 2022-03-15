import { RECEIVE_USER_LIST } from "../actions/list_actions";
import { RECEIVE_USER } from '../actions/user_actions';

const ListsReducer = (
  state = { all: {}, list: {}, new: undefined },
  action
) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_USER_LIST:
      newState.list = action.list.data;
      return newState;
    // case RECEIVE_LISTS:
    //     newState.all = action.lists.data;
    //     return newState;
    // case RECEIVE_NEW_LIST:
    //     newState.new = action.list.data
    //     return newState;
    case RECEIVE_USER:
    //   debugger;

      const combinedLists = [
        ...action.user.data.myLists,
        ...action.user.data.followingLists,
      ];

      for (let list of combinedLists) {
        const newList = {};

        newList.bookItems = list.bookItems.map((book) => book._id);
        newList.description = list.description;
        newList.followers = list.followers.map((user) => user._id);
        newList.name = list.name;
        newList.owner = list.owner;
        newList.id = list._id;

        if(!newState.list[newList.id]) newState.list[newList.id] = newList; 
        // debugger;
      }

      return newState;
    default:
      return state;
  }
};

export default ListsReducer;
