const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const keys = require('../../config/keys');
const { route } = require('./users');
const User = require('../../models/User');
const List = require("../../models/List")
const Activity = require("../../models/Activity")
const Rating = require("../../models/Rating")

/// *** --- WORK IN PROGRESS DO NOT REVIEW-- *** ///
// router.post("/", async (req, res) => {
//     const rating = req.body.rating;
//     const bookId = req.body.bookId;
//     const userId = req.body.userId;

//   try {
//      const newRating = await new Rating({
//       rating: rating,
//       bookId: bookId,
//       userId: userId
//     })

//     await newRating.save()

//   } catch (error) {
//     res.send(error.message)
//   }

   

// })

module.exports = router
