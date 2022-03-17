import { getList, createList } from '../util/list_api_util';

export const RECEIVE_LIST = "RECEIVE_LIST";
// export const RECEIVE_LISTS = "RECEIVE_LISTS";
// export const RECEIVE_NEW_LIST = "RECEIVE_NEW_LIST";

export const receiveList = list => ({
    type: RECEIVE_LIST,
    list
});

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
