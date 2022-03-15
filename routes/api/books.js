const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const keys = require('../../config/keys');
const validateSignupInput = require('../../validation/signup');
const validateLoginInput = require('../../validation/login');
const { route } = require('./users');
const User = require('../../models/User');
const List = require("../../models/List")
const Book = require('../../models/Book')


router.post("/", async(req, res)=>{
    const book = await new Book({
    volumeId: req.body.volumeId,
  })

  const createdBook = await book.save()
  res.json(createdBook)
})

module.exports = router
