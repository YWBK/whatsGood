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


export const fetchSingleBook = (volumeId) => {
  return axios({
    method: 'post',
    url: '/api/search/book',
    data: {
      searchString: volumeId
    }
  })
}


export const fetchBooksAndUsers = (str) =>{
  return axios.get('/api/search/books_and_users',{
    params:{
      searchString: str
    }
  })
}




