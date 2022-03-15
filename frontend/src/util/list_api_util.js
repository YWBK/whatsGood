import axios from 'axios';

export const createList = (data) =>{
  return axios({
    method: "POST",
    url: "api/lists",
    data
  })
}


// export const getListItems = () => {
//     return axios.get('/api/lists')
// };

// export const getUserListItems = id => {
//     return axios.get(`/api/user/${id}/lists`)
// };

// // to confirm with backend
// export const writeTweet = data => {
//     return axios.post('/api/lists/', data)
// }