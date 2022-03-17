import * as UserApiUtil from "../util/user_api_util";

export const RECEIVE_USER = "RECEIVE_USER";
export const REMOVE_USER = "REMOVE_USER";

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

export const fetchUser = (userId) => (dispatch) => {
  return UserApiUtil.fetchUser(userId)
    .then((user) => dispatch(receiveUser(user)))
    .catch((err) => console.log(err));
};

// export const followUser = (userBeingFollowedId, userId) => dispatch => {
//   return UserApiUtil.followUser(userBeingFollowedId, userId)
//     .then(res => )

// }

export const unfollowUser = (userIdBeingFollowed, userId) => (dispatch) => {
  return UserApiUtil.unfollowUser(userIdBeingFollowed, userId)
    .then(() => dispatch(removeUser(userIdBeingFollowed, userId)))
    .catch((err) => console.log(err));
};
