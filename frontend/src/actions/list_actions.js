import { getList, createList, updateListName, updateListDescription } from '../util/list_api_util';
import { removeUserList } from '../util/user_api_util';

export const RECEIVE_LIST = "RECEIVE_LIST";
export const REMOVE_LIST = "REMOVE_LIST";

export const receiveList = list => ({
    type: RECEIVE_LIST,
    list
});

export const deleteList = listId => ({
    type: REMOVE_LIST,
    listId
})

export const fetchList = listId => dispatch => (
    getList(listId)
        .then(list => {
            dispatch(receiveList(list))
        })
        .catch(err => console.log(err))
);


export const addList = data => dispatch => (
    createList(data)
        .then(createdList => {
            return dispatch(receiveList(createdList))
        })
        .catch(err => console.log(err))
)

export const removeList = (listId, userId) => dispatch => (
    removeUserList(listId, userId).then(
        res => {
            return dispatch(deleteList(listId))
        })
        .catch(err => console.log(err))
);

export const updateName = (listId, userId, newlistName) => dispatch => {
    updateListName(listId, userId, newlistName)
        .then(
            list => {
                return dispatch(receiveList(list))
            })
        .catch(err => console.log(err))
}

export const updateDescription = (listId, userId, newlistDescription) => dispatch => {
    updateListDescription(listId, userId, newlistDescription)
        .then(
            list => {
                return dispatch(receiveList(list))
            })
        .catch(err => console.log(err))
}

