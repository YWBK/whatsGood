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


router.post("/", async (req, res) => {
  debugger
  const list = await new List({
    name: req.body.name,
    description: req.body.description,
    owner: req.body.owner,
  })

  const createdList = await list.save()
  res.json(createdList)
})

router.get("/:id", async (req, res) => {
  const listId = req.params.id;
  const list = await List.findById(listId).populate({
    path: "bookItems",
    model: "Book",
  }).populate({
    path: "owner",
    model: "User",
  });
  res.json(list)
})

module.exports = router
