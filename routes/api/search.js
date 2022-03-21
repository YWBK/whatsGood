const express = require('express');
const router = express.Router();
const keys = require("../../config/keys")
const axio = require("axios")
const User = require("../../models/User");
const List = require("../../models/List");

router.post("/", (req, res, next) => {
  const searchParams = !req.body ?  res.send('searchString is blank') : req.body.searchString.split(" ").join("+");
  axio.get(`https://www.googleapis.com/books/v1/volumes?q=${searchParams}Type=books&key=${keys.googleApiKey}`)
      .then(response=> {
        res.json(response.data.items)
      })
      .catch(err => next(err))
    
})

router.post("/book", (req, res, next) =>{
  axio.get(`https://www.googleapis.com/books/v1/volumes/${req.body.searchString}?key=${keys.googleApiKey}`)
      .then(response=> {
        res.json(response.data)
      })
      .catch(err => next(err))
})



router.get("/books_users_lists", async (req, res, next) => {
  const searchParams = !req.query ?  res.send('searchString is blank') : req.query.searchString.split(" ").join("+");
  const searchKeyWords = req.query.searchString.toLowerCase()
  // debugger

  try {
    let consolidatedData = {}    
    
    const googleResponse = await axio.get(`https://www.googleapis.com/books/v1/volumes?q=${searchParams}Type=books&key=${keys.googleApiKey}`)
    consolidatedData.googleData = (googleResponse.data.items)
    
    const users = await User.find()
    const allUsers = JSON.parse(JSON.stringify(users))
    
    let backendUserData = []

    for (let i = 0; i < allUsers.length; i++) {
      const username = allUsers[i].username.split(" ");
      for (let j = 0; j < username.length; j++) {
        if (searchKeyWords.includes(username[j].toLowerCase())){
          backendUserData.push(allUsers[i]);
          break
        }              
      }      
    }
    consolidatedData.backendUserData = backendUserData;
    

    const lists = await List.find()
    const allLists = JSON.parse(JSON.stringify(lists))
    
    let backendListData = []

    for (let i = 0; i < allLists.length; i++) {
      const listname = allLists[i].name.split(" ");
      for (let j = 0; j < listname.length; j++) {
        if (searchKeyWords.includes(listname[j].toLowerCase())){
          backendListData.push(allLists[i]);
          break
        }              
      }      
    }    
    consolidatedData.backendListData = backendListData;
  
    res.send(consolidatedData)

    } catch (error) {
    res.send(error.message)
  }
})


module.exports = router
