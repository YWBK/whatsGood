import { RECEIVE_LIST } from "../actions/list_actions";
import {
  RECEIVE_USER,
  REMOVE_LIST_FOLLOW,
  ADD_LIST_FOLLOW,
} from "../actions/user_actions";
import { RECEIVE_NEW_ITEM } from "../actions/item_actions";

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
      newState.all[list.id] = list;

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
        newList.ownerName = list.owner.username ? list.owner.username : null;
        newList.id = list._id;

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

    case ADD_LIST_FOLLOW:
      debugger;
      newState.all[action.data.listId].followers.push(action.data.userId);
      return newState;
    default:
      return state;
  }
};

export default ListsReducer;
