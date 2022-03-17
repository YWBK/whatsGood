import { createBook } from '../util/book_api_util';

export const RECEIVE_NEW_ITEM = "RECEIVE_NEW_ITEM";

export const receiveNewItem = (item, listId) => ({
    type: RECEIVE_NEW_ITEM,
    item,
    listId
})

export const addItemToList = (volumeId, listId, userId) => dispatch => {
    console.log({ volumeId, listId, userId });
    createBook({ volumeId, listId, userId })
        .then(item => {
            dispatch(receiveNewItem(item, listId))
        })
        .catch(err => console.log(err))
};
