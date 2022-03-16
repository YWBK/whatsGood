const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const keys = require('../../config/keys');
const validateCreateListInput = require("../../validation/list")
const { route } = require('./users');
const User = require('../../models/User');
const List = require("../../models/List")
const Activity = require("../../models/Activity")


router.post("/", async (req, res) => {
    const { errors, isValid } = validateCreateListInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
  
  const list = await new List({
    name: req.body.name,
    description: req.body.description,
    owner: req.body.owner,
  })

  const createdList = await list.save()
  await User.findOneAndUpdate({
          _id: "6230e58ee8ace707b68fee77",
        },{
            $addToSet: {
                myLists: createdList._id,
            },
        })
  
  const newActivity = await new Activity({
      activityName: "CREATE_LIST",
      actionType: "created",
      userId: req.body.owner,
      listId: createdList._id
  })

  await newActivity.save()

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
