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



export const multiAttempts = async (str, numAttempt = 1) =>{
  const response = await fetchBooksUsersLists(str)
  if (typeof response.data === "object"){
    return response
  } else {
    if (numAttempt > 10){
      return response.data
    }else {
      numAttempt ++
      return multiAttempts(str, numAttempt)
    }
  }
}


export const fetchBooksUsersLists = (str) =>{
  return axios.get('/api/search/books_users_lists',{
    params:{
      searchString: str,
    }
  })
}




