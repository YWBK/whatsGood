import { createBook, removeBookFromList } from '../util/book_api_util';

export const RECEIVE_NEW_ITEM = "RECEIVE_NEW_ITEM";
export const ITEM_REMOVED_FROM_LIST = "ITEM_REMOVED_FROM_LIST";

export const receiveNewItem = (item, listId) => ({
    type: RECEIVE_NEW_ITEM,
    item,
    listId
})

export const itemRemovedFromList = (bookId, listId) => ({
    type: ITEM_REMOVED_FROM_LIST,
    bookId,
    listId
})

export const addItemToList = (volumeId, listId, userId) => dispatch => {
    createBook({ volumeId, listId, userId })
        .then(item => {
            dispatch(receiveNewItem(item.data, listId))
        })
        .catch(err => console.log(err))
};

export const removeItemFromList = (userId, volumeId, listId) => dispatch => {
    // debugger
    removeBookFromList(userId, volumeId, listId)
        .then(res => {
            dispatch(itemRemovedFromList(volumeId, listId))
        })
        .catch(err => console.log(err))
};


