import { RECEIVE_LIST, REMOVE_LIST } from "../actions/list_actions";
import {
  RECEIVE_USER,
  REMOVE_LIST_FOLLOW,
  ADD_LIST_FOLLOW,
} from "../actions/user_actions";
import {
  RECEIVE_NEW_ITEM,
  ITEM_REMOVED_FROM_LIST,
} from "../actions/item_actions";
import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_LOGOUT,
  RECEIVE_USER_SIGN_IN,
} from "../actions/session_actions";

const ListsReducer = (
  state = { all: {}, list: {}, new: undefined },
  action
) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_LIST:
      const list = action.list.data;
      list.id = list._id;
      delete list._id;
      list.ownerId = list.owner._id ? list.owner._id : list.owner;
      list.ownerName = list.owner.username ? list.owner.username : null;
      newState.all[list.id] = list;

      return newState;
    case REMOVE_LIST:
      if (action.listId in newState.all) {
        delete newState.all[action.listId];
      }
      return newState;
    case RECEIVE_USER:
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
        newList.ownerId = list.owner._id ? list.owner._id : list.owner;
        newList.ownerName = list.owner.username ? list.owner.username : action.user.data.username;
        newList.id = list._id;
        // debugger;
        if (!newState.all[newList.id]) newState.all[newList.id] = newList;
      }

      return newState;

    case RECEIVE_NEW_ITEM:
      const item = action.item;
      const listId = action.listId;
      if (listId in newState.all) {
        newState.all[listId].bookItems.push(item);
      }
      return newState;

    case ITEM_REMOVED_FROM_LIST:
      if (action.listId in newState.all) {
        newState.all[action.listId].bookItems = newState.all[
          action.listId
        ].bookItems.filter(
          (item) => item._id !== action.bookId && item !== action.bookId
        );
      }
      return newState;

    case ADD_LIST_FOLLOW:
      newState.all[action.data.listId].followers.push(action.data.userId);
      return newState;

    case REMOVE_LIST_FOLLOW:
      newState.all[action.data.listId].followers = newState.all[
        action.data.listId
      ].followers.filter((followerId) => followerId !== action.data.userId);

      return newState;
    case RECEIVE_USER_LOGOUT:
      newState.all = {};
      newState.list = {};
      newState.new = {};
      return newState;
    default:
      return state;
  }
};

export default ListsReducer;
