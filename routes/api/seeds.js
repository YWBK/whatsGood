const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../../models/User');
const Book = require('../../models/Book');
const keys = require('../../config/keys');
const Activity = require("../../models/Activity")
const List = require('../../models/List');
const { route } = require('./users');

router.get('/destroy', async (req, res) => {
  await User.deleteMany( {} )
  await List.deleteMany( {} )
  await Book.deleteMany( {} )
  await Activity.deleteMany( {} )
  
  res.send("complete!")
});

router.get('/add_lists', async (req, res) => {
  const lists = ["Wish list", "Must read list", "cherry picking list"]

  const allUsers = await User.find()
  const parsedAllUsers = JSON.parse(JSON.stringify(allUsers))
  const userIds = []

  for (let i = 0; i < parsedAllUsers.length; i++) {
    userIds.push(parsedAllUsers[i]._id)    
  }

  for (let j = 0; j < userIds.length; j++) {
    for (let k = 0; k < lists.length; k++) {
      //create the list
      listName = lists[k];
      const newList = await new List({
        name: listName,
        description: "Books that I am interested",
        owner: userIds[j],
      })
      const createdList = await newList.save()

      //add the list to the User's myLists bucket
      await User.findOneAndUpdate({
        _id: userIds[j]
      },{
        $addToSet: {
          myLists: createdList._id,
        }
      })
    }    
  }
  
  res.send("complete!")
});

router.get('/add_following_lists', async (req, res) => {
  const allUsers = await User.find()
  const parsedAllUsers = JSON.parse(JSON.stringify(allUsers))
  const userIds = []

  for (let i = 0; i < parsedAllUsers.length; i++) {
    userIds.push(parsedAllUsers[i]._id)   
    //randomly pick a user and select one of their lists
  //   const randNum = Math.floor(Math.random() * parsedAllUsers.length);
  //   if (userIds[randNum] === userIds[i])

  }


  
  //add the list to the User's myLists bucket
    //   await User.findOneAndUpdate({
    //     _id: userIds[j]
    //   },{
    //     $addToSet: {
    //       myLists: createdList._id,
    //     }
    //   })
    // }    
  // }
  
  res.send("complete!")
});




module.exports = router;