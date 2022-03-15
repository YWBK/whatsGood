// import { getUserList } from '../util/list_api_util';

export const RECEIVE_USER_LIST = "RECEIVE_USER_LIST";
// export const RECEIVE_LISTS = "RECEIVE_LISTS";
// export const RECEIVE_NEW_LIST = "RECEIVE_NEW_LIST";

export const receiveUserList = list => ({
    type: RECEIVE_USER_LIST,
    list
});

// export const fetchUserList = listId => dispatch => (
//     getUserList(listId)
//         .then(list => dispatch(receiveUserList(list)))
//         .catch(err => console.log(err))
// );

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