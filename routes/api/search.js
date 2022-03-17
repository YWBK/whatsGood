const express = require('express');
const router = express.Router();
const keys = require("../../config/keys")
const axio = require("axios")
const User = require("../../models/User")

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



router.post("/books_and_users", async (req, res, next) => {
  const searchParams = !req.body ?  res.send('searchString is blank') : req.body.searchString.split(" ").join("+");
  const searchKeyWords = req.body.searchString.toLowerCase()

  try {
    let consolidatedData = {}
    
    const googleResponse = await axio.get(`https://www.googleapis.com/books/v1/volumes?q=${searchParams}Type=books&key=${keys.googleApiKey}`)
    
    consolidatedData.googleData = googleResponse
    
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
    res.send(consolidatedData)
    // res.json(consolidatedData)

  } catch (error) {
    res.send(error.message)
  }
      
    
})


module.exports = router
