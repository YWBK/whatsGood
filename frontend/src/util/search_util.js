import axios from "axios"

export const fetchBooks  = (str) => {
  return axios({
    method: 'post',
    url: '/api/search',
    data: {
      searchString: str
    }
  })
  
}




