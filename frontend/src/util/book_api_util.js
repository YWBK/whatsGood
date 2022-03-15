import axios from 'axios';

export const createBook = (data) =>{
  return axios({
    method: "POST",
    url: "api/books",
    data
  })
}