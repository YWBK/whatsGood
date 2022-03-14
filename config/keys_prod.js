import axios from "axios"

export const fetchBooks  = (str) => {
  return axios.get('/api/search')
}
