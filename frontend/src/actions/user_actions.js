import * as UserApiUtil from "../util/user_api_util";

export const RECEIVE_USER = "RECEIVE_USER";
export const REMOVE_USER = "REMOVE_USER";
export const REMOVE_LIST_FOLLOW = "REMOVE_LIST_FOLLOW";
export const ADD_LIST_FOLLOW = "ADD_LIST_FOLLOW";
export const ADD_USER_FOLLOW = "ADD_USER_FOLLOW";

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

const removeUser = (userIdBeingFollowed, userId) => ({
  type: REMOVE_USER,
  data: {
    userIdBeingFollowed,
    userId,
  },
});

const addUserFollow = (userBeingFollowedId, userId) => ({
  type: ADD_USER_FOLLOW,
  data: {
    userBeingFollowedId,
    userId,
  },
});

const removeListFollow = (listId, userId) => ({
  type: REMOVE_LIST_FOLLOW,
  data: {
    listId,
    userId,
  },
});

const addListFollow = (listId, userId) => ({
  type: ADD_LIST_FOLLOW,
  data: {
    listId,
    userId,
  },
});

export const fetchUser = (userId) => (dispatch) => {
  // debugger;
  return UserApiUtil.fetchUser(userId)
    .then((user) => {
      // debugger;
      dispatch(receiveUser(user))
    })
    .catch((err) => console.log(err));
};

export const followUser = (userBeingFollowedId, userId) => (dispatch) => {
  return UserApiUtil.followUser(userBeingFollowedId, userId)
    .then(() => dispatch(addUserFollow(userBeingFollowedId, userId)))
    .catch((err) => console.log(err));
};

export const unfollowUser = (userIdBeingFollowed, userId) => (dispatch) => {
  return UserApiUtil.unfollowUser(userIdBeingFollowed, userId)
    .then(() => dispatch(removeUser(userIdBeingFollowed, userId)))
    .catch((err) => console.log(err));
};

export const unfollowList = (listId, userId) => (dispatch) => {
  return UserApiUtil.unfollowList(listId, userId)
    .then(() => dispatch(removeListFollow(listId, userId)))
    .catch((err) => console.log(err));
};

export const followList = (listId, userId) => (dispatch) => {
  return UserApiUtil.followList(listId, userId)
    .then(() => dispatch(addListFollow(listId, userId)))
    .catch((err) => console.log(err));
};
