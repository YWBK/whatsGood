import axios from 'axios';

export const createBook = (data) =>{
  return axios({
    method: "POST",
    url: "api/books",
    data
  })
}


export const popularScore = (userId, bookId) => {
    return axios.get('/api/books/popular_score', {
      params:{
        userId: userId,
        bookId: bookId    
      }
    })
};


export const removeBookFromList = (userId, bookId, listId) =>{
  return axios.post("api/books/remove_book_from_list",{
     listId: listId,
     userId: userId,
     bookId: bookId
  })
}