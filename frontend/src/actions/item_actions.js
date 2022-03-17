import { createBook } from '../util/book_api_util';

export const RECEIVE_NEW_ITEM = "RECEIVE_NEW_ITEM";

export const receiveNewItem = (item, listId) => ({
    type: RECEIVE_NEW_ITEM,
    item,
    listId
})

export const addItemToList = (volumeId, listId, userId) => dispatch => {
    createBook({ volumeId, listId, userId })
        .then(item => {
            console.log(item);
            dispatch(receiveNewItem(item.data, listId))
        })
        .catch(err => console.log(err))
    // For ui only test    
    // dispatch(receiveNewItem({ volumeId: 'QpkrDwAAQBAJ' }, listId));
};
