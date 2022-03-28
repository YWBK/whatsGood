import axios from "axios"


export const fetchBooks = async (str, numAttempt = 1) =>{
  const response = await _fetchBooks(str)
  if (typeof response.data === "object"){
    return response
  } else {
    if (numAttempt > 10){
      return response
    }else {
      numAttempt ++
      return fetchBooks(str, numAttempt)
    }
  }
}



export const _fetchBooks  = (str) => {
  return axios({
    method: 'post',
    url: '/api/search',
    data: {
      searchString: str
    }
  })  
}



export const fetchSingleBook = async (str, numAttempt = 1) =>{
  const response = await _fetchSingleBook(str)
  if (typeof response.data === "object"){
    return response
  } else {
    if (numAttempt > 10){
      return response
    }else {
      numAttempt ++
      return fetchSingleBook(str, numAttempt)
    }
  }
}

export const _fetchSingleBook = (volumeId) => {
  return axios({
    method: 'post',
    url: '/api/search/book',
    data: {
      searchString: volumeId
    }
  })
}



export const fetchBooksUsersLists = async (str, numAttempt = 1) =>{
  const response = await _fetchBooksUsersLists(str)
  if (typeof response.data === "object"){
    return response
  } else {
    if (numAttempt > 10){
      return response.data
    }else {
      numAttempt ++
      return fetchBooksUsersLists(str, numAttempt)
    }
  }
}


const _fetchBooksUsersLists = (str) =>{
  return axios.get('/api/search/books_users_lists',{
    params:{
      searchString: str,
    }
  })
}




