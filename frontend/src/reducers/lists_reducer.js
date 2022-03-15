import { RECEIVE_USER_LIST } from '../actions/list_actions';

const ListsReducer = (state = { all: {}, list: {}, new: undefined }, action) => {
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
        default:
            return state;
    }
};

export default ListsReducer;