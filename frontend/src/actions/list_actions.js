import { getList } from '../util/list_api_util';

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

// export const receiveTweets = tweets => ({
//     type: RECEIVE_TWEETS,
//     tweets
// });
// export const receiveNewTweet = tweet => ({
//     type: RECEIVE_NEW_TWEET,
//     tweet
// })
// export const fetchTweets = () => dispatch => (
//     getTweets()
//         .then(tweets => dispatch(receiveTweets(tweets)))
//         .catch(err => console.log(err))
// );


// export const composeTweet = data => dispatch => (
//     writeTweet(data)
//         .then(tweet => dispatch(receiveNewTweet(tweet)))
//         .catch(err => console.log(err))
// );