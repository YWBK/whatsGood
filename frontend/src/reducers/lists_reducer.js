import { RECEIVE_LIST } from "../actions/list_actions";
import { RECEIVE_USER } from '../actions/user_actions';

const ListsReducer = (
    state = { all: {}, list: {}, new: undefined },
    action
) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_LIST:
            const list = action.list.data;
            newState.all[list._id] = list;
            return newState;
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

                if (!newState.all[newList.id]) newState.all[newList.id] = newList;
                // debugger;
            }

            debugger;
            return newState;
        default:
            return state;
    }
};

export default ListsReducer;
