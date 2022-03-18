import axios from 'axios';

export const createBook = (data) =>{
  return axios({
    method: "POST",
    url: "api/books",
    data
  })
}


export const popularScore = (userId, volumeId) => {
    return axios.get('/api/books/popular_score', {
      params:{
        userId: userId,
        volumeId: volumeId    
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