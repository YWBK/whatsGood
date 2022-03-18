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
  //find all users
  const allUsers = await User.find()
  const parsedAllUsers = JSON.parse(JSON.stringify(allUsers))
  
  //find all userIds
  const allUserIds = []
  for (let i = 0; i < parsedAllUsers.length; i++) {
      allUserIds.push(parsedAllUsers[i]._id)
  }
  let result = {};
  let addedToFollowingList = [];
  let addedToFollower = [];

  //iterate through all users
  for (let j = 0; j < allUserIds.length; j++) {
      // 4 times for each users
      const currentUser = allUserIds[j]
    for (let counter = 0; counter < 5; counter++) {
          //picked a user's list
          const followerableUsers = Array.from(allUserIds).filter(ele => ele !== currentUser)    
          const randNum = Math.floor(Math.random() * followerableUsers.length);
          const pickedUserId = followerableUsers[randNum]

          const pickedUserData = await User.findOne({
            _id: pickedUserId
          })
          
          const pickedUserLists = JSON.parse(JSON.stringify(pickedUserData)).myLists
          const randNumber = Math.floor(Math.random() * pickedUserLists.length);
          const pickedList =  pickedUserLists[randNumber]
          //add the picked list to currentUser's followingList
          const addedList = await User.findOneAndUpdate({
            _id: currentUser
          },{
            $addToSet: {
              followingLists: pickedList
            } 
          })
          addedToFollowingList.push(addedList)

          //add the currentUser to the picked list's follower bucket
          const addedFollower = await List.findByIdAndUpdate({
            _id: pickedList
          },{
            $addToSet: {
              followers: currentUser
            }
          })        
          addedToFollower.push(addedFollower)
      }
  }
    
  result.list = addedToFollowingList;
  result.follower = addedToFollower  
  res.send(result)
});



router.get('/add_following_users', async (req, res) => {
  //find all users
  const allUsers = await User.find()
  const parsedAllUsers = JSON.parse(JSON.stringify(allUsers))
  
  //find all userIds
  const allUserIds = []
  for (let i = 0; i < parsedAllUsers.length; i++) {
      allUserIds.push(parsedAllUsers[i]._id)
  }
  let result = {};
  let addedToFollowingUsers = [];

  //iterate through all users
  for (let j = 0; j < allUserIds.length; j++) {
      // 4 times for each users
      const currentUser = allUserIds[j]
    for (let counter = 0; counter < 5; counter++) {
          //picked a user's list
          const followerableUsers = Array.from(allUserIds).filter(ele => ele !== currentUser)    
          const randNum = Math.floor(Math.random() * followerableUsers.length);
          const pickedUserId = followerableUsers[randNum]

          
          //add the picked user to currentUser's followingUsers bucket
          const addedUser = await User.findOneAndUpdate({
            _id: currentUser
          },{
            $addToSet: {
              followingUsers: pickedUserId
            } 
          })
          addedToFollowingUsers.push(addedUser)
      }
  }
    
  result.followingUser = addedToFollowingUsers  
  res.send(result)
});




router.get('/add_books', async (req, res) => {
   const allBooks = [
     "yyBMEAAAQBAJ",
     "xTk8DwAAQBAJ",
     "y8nNCwAAQBAJ",
     "GTHfDwAAQBAJ",
     "tWAa3VJ4_UQC",
     "p1b1jFzCV6IC",
     "S-ErDgAAQBAJ",
     "_4YvPwAACAAJ",
     "J1Z2oAEACAAJ",
     "mZB1PwAACAAJ",
   ]

  
   //find all lists
  const allLists = await List.find()
  const parsedAllLists = JSON.parse(JSON.stringify(allLists))

  const firstList = parsedAllLists[0]._id;
  const allOtherLists = parsedAllLists.slice(1) 
  
  //create books with firstList
  for (let i = 0; i < allBooks.length; i++) {
      const newBook = await new Book({
        volumeId: allBooks[i],
        listId: firstList
      })    
     newBook.save() 
  }
  
  //find all books created
  const allBooksCreated = await Book.find();
  const parsedAllBooks = JSON.parse(JSON.stringify(allBooksCreated))
 
  //find all bookIds
  const allBookIds = []
  for (let i = 0; i < parsedAllBooks.length; i++) {
      allBookIds.push(parsedAllBooks[i]._id)
  }
  
  let result = {};
  let addedToBookItems = [];
  let addedToInLists = [];
//   debugger
  //add these ten books to the firstList's bookItem bucket, and add this list to all the books' inList bucket
  for (let x = 0; x < allBookIds.length; x++) {        
      await List.findOneAndUpdate({
        _id: firstList
      },{
        $addToSet:{
          bookItems: allBookIds[x]
        }
      });

      await Book.findOneAndUpdate({
        _id: allBookIds[x]
      },{
        $addToSet:{
          inLists: firstList
        }
      })
  };

  //iterate through all other lists (excluded the first list that created all the books)
  for (let j = 0; j < allOtherLists.length; j++) {
    const currentList = allOtherLists[j]._id
    
    for (let counter = 0; counter < 5; counter++) {
          //picked a bookId          
          const randNum = Math.floor(Math.random() * allBookIds.length);
          const pickedBookId = allBookIds[randNum]

          
          //add the picked list to List's bookItem bucket
          const addedBookItem = await List.findOneAndUpdate({
            _id: currentList
          },{
            $addToSet: {
              bookItems: pickedBookId
            } 
          })
          addedToBookItems.push(addedBookItem)

          //add the list to the book's inList bucket
          const addedInList = await Book.findByIdAndUpdate({
            _id: pickedBookId
          },{
            $addToSet: {
              inLists: currentList
            }
          })        
          addedToInLists.push(addedInList)
      }
  }
    
  result.book = addedToBookItems;
  result.list = addedToInLists;  
  res.send(result)
  
});




module.exports = router;
