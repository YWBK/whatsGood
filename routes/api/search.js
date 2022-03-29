const express = require('express');
const router = express.Router();
const keys = require("../../config/keys")
const axio = require("axios")
const User = require("../../models/User");
const List = require("../../models/List");

router.post("/", async (req, res) => {
  const randomKey = Math.floor(Math.random() * 5)
  let googleKey = keys.googleApiKey

  if (randomKey === 0) {
    googleKey = keys.googleApiKey;
  } else if (randomKey === 1) {
    googleKey = keys.googleApiKey_1;
  } else if (randomKey === 2) {
    googleKey = keys.googleApiKey_2;
  } else if (randomKey === 3) {
    googleKey = keys.googleApiKey_3;
  } else {
    googleKey = keys.googleApiKey_4;
  }
  const searchParams = !req.body ? res.send('searchString is blank') : req.body.searchString.split(" ").join("+");

  try {
    const response = await axio.get(`https://www.googleapis.com/books/v1/volumes?q=${searchParams}Type=books&key=${googleKey}`)
    res.send(response.data.items)
  } catch (error) {
    res.send(error.message)
  }
})

router.post("/book", async (req, res) => {
  const randomKey = Math.floor(Math.random() * 5)
  let googleKey = keys.googleApiKey

  if (randomKey === 0) {
    googleKey = keys.googleApiKey;
  } else if (randomKey === 1) {
    googleKey = keys.googleApiKey_1;
  } else if (randomKey === 2) {
    googleKey = keys.googleApiKey_2;
  } else if (randomKey === 3) {
    googleKey = keys.googleApiKey_3;
  } else {
    googleKey = keys.googleApiKey_4;
  }

  try {
    const response = await axio.get(`https://www.googleapis.com/books/v1/volumes/${req.body.searchString}?key=${googleKey}`)
    res.send(response.data)
  } catch (error) {
    res.send(error.message)
  }
})



router.get("/books_users_lists", async (req, res, next) => {
  const searchParams = !req.query ? res.send('searchString is blank') : req.query.searchString.split(" ").join("+");
  const searchKeyWords = req.query.searchString.toLowerCase()

  const randomKey = Math.floor(Math.random() * 5)
  let googleKey = keys.googleApiKey

  if (randomKey === 0) {
    googleKey = keys.googleApiKey;
  } else if (randomKey === 1) {
    googleKey = keys.googleApiKey_1;
  } else if (randomKey === 2) {
    googleKey = keys.googleApiKey_2;
  } else if (randomKey === 3) {
    googleKey = keys.googleApiKey_3;
  } else {
    googleKey = keys.googleApiKey_4;
  }

  try {
    let consolidatedData = {}

    const googleResponse = await axio.get(`https://www.googleapis.com/books/v1/volumes?q=${searchParams}Type=books&key=${googleKey}`)
    consolidatedData.googleData = (googleResponse.data.items)

    const users = await User.find()
    const allUsers = JSON.parse(JSON.stringify(users))

    let backendUserData = []

    for (let i = 0; i < allUsers.length; i++) {
      const username = allUsers[i].username.split(" ");
      for (let j = 0; j < username.length; j++) {
        if (searchKeyWords.includes(username[j].toLowerCase())) {
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
        if (searchKeyWords.includes(listname[j].toLowerCase())) {
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
