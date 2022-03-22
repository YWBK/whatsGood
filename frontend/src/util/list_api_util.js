import axios from 'axios';

export const createList = (data) => {
  return axios({
    method: "POST",
    url: "api/lists",
    data
  })
}

export const getList = (listId) => {
  return axios({
    method: "GET",
    url: `/api/lists/${listId}`
  })
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