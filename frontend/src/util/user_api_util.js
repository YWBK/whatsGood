import axios from "axios";

export const fetchUser = (userId) => {
  // debugger;
  return axios.get(`/api/users/${userId}`);
};


export const followList = (data) =>{
  return axios({
    method: "POST",
    url: "api/users/followinglist",
    data
  })
}


export const unfollowList = (data) =>{
  return axios({
    method: "POST",
    url: "api/users/unfollowlist",
    data
  })
}


export const followUser = (data) =>{
  return axios({
    method: "POST",
    url: "api/users/followuser",
    data
  })
}