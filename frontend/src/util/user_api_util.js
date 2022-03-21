import axios from "axios";

export const fetchUser = (userId) => {
  return axios.get(`/api/users/${userId}`);
};


export const followList = (listId, userId) => {
  return axios.post("api/users/followlist", {
    listId: listId,
    userId: userId
  })
}


export const unfollowList = (listId, userId) => {
  return axios.post("api/users/unfollowlist", {
    listId: listId,
    userId: userId
  })
}


export const followUser = (userIdBeingFollowed, userId) => {
  return axios.post("api/users/followuser", {
    userIdBeingFollowed: userIdBeingFollowed,
    userId: userId
  })
}


export const unfollowUser = (userIdBeingFollowed, userId) => {
  return axios.post("api/users/unfollowuser", {
    userIdBeingFollowed: userIdBeingFollowed,
    userId: userId
  })
}

export const removeUserList = (listId, userId) => {
  return axios.post("api/users/remove_a_list", {
    userId,
    listId
  });
}


export const updateListName = (listId, userId, newlistName) => {
  return axios.post("api/users/update_list_name", {
    userId,
    listId,
    newlistName
  });
}


export const updateListDescription = (listId, userId, newlistDescription) => {
  return axios.post("api/users/update_list_description", {
    userId,
    listId,
    newlistDescription
  });
}