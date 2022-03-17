const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const keys = require('../../config/keys');
const { route } = require('./users');
const validateCreateBookInput = require("../../validation/book")
const User = require('../../models/User');
const List = require("../../models/List")
const Book = require('../../models/Book')
const Activity = require("../../models/Activity");



router.post("/", async(req, res)=>{
    const { errors, isValid } = validateCreateBookInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const existedBook = await Book.findOne({
      volumeId: req.body.volumeId
    })    
     
    if (!JSON.parse(JSON.stringify(existedBook))){
      const book = await new Book({
        volumeId: req.body.volumeId,
        userId: req.body.userId,
        listId: req.body.listId,
      })
      
      //if book not found in Book model, create a book
      const createdBook = await book.save()    
      
      try {
        //add the list to the inLists array
        await Book.findOneAndUpdate({
                volumeId: req.body.volumeId
              },{
                $addToSet:{
                  inLists: req.body.listId
                }
              });    
  
        //add the book to the bookItem bucket for the List       
        await List.findOneAndUpdate({
                _id: req.body.listId
              },{
                $addToSet:{
                  bookItems: JSON.parse(JSON.stringify(createdBook))._id
                }
              });    

        //add to activity model      
        const newActivity = await new Activity({
              activityName: "ADD_BOOK",
              actionType: "added",
              userId: req.body.userId,
              listId: req.body.listId,
              bookId: JSON.parse(JSON.stringify(createdBook))._id
        })

        await newActivity.save()
  
        JSON.parse(JSON.stringify(existedBook)) ? res.json(existedBook): res.json(createdBook)
      } catch (error) {
        res.json(error.message)
      }

    } else {

      try {
        //add the list to the inLists array
        const bookInDB = await Book.findOneAndUpdate({
          volumeId: req.body.volumeId
        },{
          $addToSet:{
            inLists: req.body.listId
          }
        });    
        
        //add the book to the bookItem bucket for the List

        await List.findOneAndUpdate({
                _id: req.body.listId
              },{
                $addToSet:{
                  bookItems: JSON.parse(JSON.stringify(bookInDB))._id
                }
              });            

        //add to activity model      
        const newActivity = await new Activity({
              activityName: "ADD_BOOK",
              actionType: "added",
              userId: req.body.userId,
              listId: req.body.listId,
              bookId: JSON.parse(JSON.stringify(bookInDB))._id
        })

        await newActivity.save()
        JSON.parse(JSON.stringify(existedBook)) ? res.json(existedBook): res.json(createdBook)

      } catch (error) {
        res.json(error.message)
      }     

    }
})


//userId: 62315dc275a6e9c43feb0730
//bookId: 623231a2441dbc435883f721
// two people in user's followUser list and one has that book. 50%
router.get('/popular_score', async(req, res) =>{
  const userId  = req.query.userId;
  const bookId  = req.query.bookId;
  const book = await Book.findOne({
    _id: bookId
  }).populate({
    path: "inLists",
    model: "List"
  })

  //find all users added this book to their lists
  const bookInLists = JSON.parse(JSON.stringify(book)).inLists
  const allUsersAddedThisBook = []

  for (let i = 0; i < bookInLists.length; i++) {
      if (!allUsersAddedThisBook.includes(bookInLists[i].owner)){
        allUsersAddedThisBook.push(bookInLists[i].owner)
      }
  }
  
  const user = await User.findOne({
    _id: userId
  })
  
  //users are following these users
  const followingUsers = JSON.parse(JSON.stringify(user)).followingUsers
  
  let counter = 0;
  for (let i = 0; i < followingUsers.length; i++) {
      if (allUsersAddedThisBook.includes(followingUsers[i])){       
        counter++
      }
  }      
    
  const percentage = `${((100 * counter) / followingUsers.length)}%`

  res.json(percentage)
})



module.exports = router
