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
const Activity = require("../../models/Activity")


router.get("/", async (req, res) => {
  const fieldName = req.query.fieldName;
  const value = req.query.value

  // try {
  //   const results = await Activity.find({
  //     fieldName: {$match: value}
  //   })
  //   res.json(results)
  // } catch (error) {
  //   res.send(error.message)
  // }
  // debugger
})


module.exports = router
