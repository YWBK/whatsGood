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
const Activity = require("../../models/Activity")


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
  
        res.send("The book has successfully added to the list")        
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
        res.send("The book has successfully added to the list")
      } catch (error) {
        res.json(error.message)
      }     

    }
})

module.exports = router
