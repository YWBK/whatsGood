// import { RECEIVE_LISTS, RECEIVE_USER_LISTS, RECEIVE_NEW_LIST } from '../actions/listitemsactions';

// const ListItemsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
//     Object.freeze(state);
//     let newState = Object.assign({}, state);
//     switch (action.type) {
//         case RECEIVE_LISTS:
//             newState.all = action.lists.data;
//             return newState;
//         case RECEIVE_USER_LISTS:
//             newState.user = action.lists.data;
//             return newState;
//         case RECEIVE_NEW_LIST:
//             newState.new = action.list.data
//             return newState;
//         default:
//             return state;
//     }
// };

// export default ListItemsReducer;