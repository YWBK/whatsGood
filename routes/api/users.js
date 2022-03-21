const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../../models/User');
const keys = require('../../config/keys');
const Activity = require("../../models/Activity")
const validateSignupInput = require('../../validation/signup');
const validateLoginInput = require('../../validation/login');
const List = require('../../models/List');



router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));


router.get('/current', passport
    .authenticate('jwt', { session: false }), (req, res) => {
        res.json({
            id: req.user.id,
            username: req.user.username,
            email: req.user.email
        });
    }
)


router.post('/signup', (req, res) => {
    const { errors, isValid } = validateSignupInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    User.find({ $or: [{ email: req.body.email }, { username: req.body.username }] })
        .then(users => {
            if (users.length > 0) {
                users.forEach(user => {
                    (user.username === req.body.username) ? errors.username = 'Username is taken' : null;
                    (user.email === req.body.email) ? errors.email = 'Email is taken' : null;
                })
                
                res.status(400).json(errors);
            } else {
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                const payload = { id: user.id, username: user.username };

                                jwt.sign(
                                    payload,
                                    keys.secretOrKey,
                                    { expiresIn: 3600 },
                                    (err, token) => {
                                        res.json({
                                            success: true,
                                            token: 'Bear ' + token
                                        })
                                    })
                            })
                            .catch(err => console.log(err));
                            
                    })
                })
            }
        })
})

router.post('/login', (req, res) => {
    const { errors, isEmail, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    let email, username = null;
    if (isEmail) {
        email = req.body.emailOrUsername;
    } else {
        username = req.body.emailOrUsername;
    }
    const password = req.body.password;

    User.find({ $or: [{ email }, { username }] })
        .then(users => {
            if (users.length < 1) {
                if (email) {
                    errors.email = 'No user with that email found'
                } else {
                    errors.username = 'No user with that username found'
                }
                return res.status(404).json(errors);
            }

            const user = users[0]
            bcrypt
                .compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            username: user.username,
                            myLists: user.myLists,
                            followingLists: user.followingLists,
                            followingUsers: user.followingUsers
                        };

                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            });
                    } else {
                        return res.status(400).json({ password: 'Incorrect password' });
                    }
                })
        })
})

// http://localhost:5000/api/users/6230e58ee8ace707b68fee77
//user show that contains myList, followingLists and followerUsers
router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId)
            .populate({
                path: "followingLists",
                model: "List",
                populate: {
                    path: "bookItems",
                    model: "Book"
                },
            })
            .populate({
                path: "followingLists",
                model: "List",
                populate: {
                    path: "followers",
                    model: "User"
                },
            })
            .populate({
                path: "followingLists",
                model: "List",
                populate: {
                    path: "owner",
                    model: "User"
                },
            })

            .populate({
                path: "myLists",
                model: "List",
                populate: {
                    path: "followers",
                    model: "User"
                },
            })
            .populate({
                path: "myLists",
                model: "List",
                populate: {
                    path: "bookItems",
                    model: "Book"
                },

            })

            .populate({
                path: "followingUsers",
                model: "User",
                populate: {
                    path: "myLists",
                    model: "User"
                },
            })
            .populate({
                path: "followingUsers",
                model: "User",
                populate: {
                    path: "followingLists",
                    model: "List"
                },
            })
            .populate({
                path: "followingUsers",
                model: "User",
                populate: {
                    path: "followingUsers",
                    model: "User"
                },
            })

        res.json(user)
    } catch (e) {
        res.status(404).json({ user: 'No user found' })
    }
})


//user follows a list
router.post('/followlist', async (req, res) => {
    const listId = req.body.listId
    const userId = req.body.userId

    try {
        await User.findOneAndUpdate({
            _id: userId
        }, {
            $addToSet: {
                followingLists: listId
            }
        })

        await List.findOneAndUpdate({
            _id: listId
        }, {
            $addToSet: {
                followers: userId
            }
        })

        const list = await List.findOne({
            _id: listId
        })

        //add to activity model      
        const newActivity = await new Activity({
            activityName: "FOLLOW_LIST",
            actionType: "followed",
            userId: userId,
            listId: listId,
        })
        await newActivity.save()

        res.json(list)
    } catch (error) {
        res.json(error.message)
    }
})


//user unfollows a list
router.post('/unfollowlist', async (req, res) => {
    const listId = req.body.listId
    const userId = req.body.userId
  try {
    await User.findOneAndUpdate({
        _id: userId
    },{
        $pull:{
            followingLists: listId
        }
    })

    await List.findOneAndUpdate({
        _id: listId
    },{
        $pull:{
            followers: userId
        }
    })

    const list = await List.findOne({
        _id: listId
    })

    //add to activity model      
    const newActivity = await new Activity({
            activityName: "UNFOLLOW_LIST",
            actionType: "unfollowed",
            userId: userId,
            listId: listId,
        })

        await newActivity.save()

    res.json(list)
  } catch (error) {
      res.json(error.message)
  }
})




//user follows a user
router.post('/followuser', async (req, res) => {
    const userIdBeingFollowed = req.body.userIdBeingFollowed
    const userId = req.body.userId
  try {
    await User.findOneAndUpdate({
        _id: userId
    },{
        $addToSet:{
            followingUsers: userIdBeingFollowed
        }
    })

    const user = await User.findOne({
         _id: userId
    })

    //add to activity model      
    const newActivity = await new Activity({
            activityName: "FOLLOW_USER",
            actionType: "followed",
            userId: userId,
            userIdBeingFollowed: userIdBeingFollowed
        })

        await newActivity.save()

    res.json(user)
  } catch (error) {
      res.json(error.message)
  }
})



//user unfollows a user
router.post('/unfollowuser', async (req, res) => {
    const userIdBeingFollowed = req.body.userIdBeingFollowed
    const userId = req.body.userId
    
  try {
    await User.findOneAndUpdate({
        _id: userId
    },{
        $pull:{
            followingUsers: userIdBeingFollowed
        }
    })

    const user = await User.findOne({
        _id: userId
    })

    //add to activity model      
    const newActivity = await new Activity({
            activityName: "UNFOLLOW_USER",
            actionType: "unfollowed",
            userId: userId,
            userIdBeingFollowed: userIdBeingFollowed
    })
    await newActivity.save()
    
    res.json(user)
  } catch (error) {
      res.json(error.message)
  }
})


//user removes a list
router.post('/remove_a_list', async (req, res) => {
    const userId = req.body.userId;
    const listId = req.body.listId;
    try { 
        //find all users have this list
        const list = await List.findOne({
            _id: listId
        });

        const listParsed = JSON.parse(JSON.stringify(list))

        //can't remove a list created by someone else
        if (listParsed.owner !== userId){
            return res.status(400).send("Can't remove a list created by someone else")
        }

        //iterate through all the users who have this list in their followingLists bucket and delete the list
        for (let i = 0; i < listParsed.followers.length; i++) {
            const listFollowerId = listParsed.followers[i]
            // debugger
            await User.findByIdAndUpdate({
                _id: listFollowerId
            },{
                $pull:{
                    followingLists: listId
                }
            })
        }

        //remove the list from list owner / current user's mylist bucket
        const user = await User.findOneAndUpdate({
            _id: userId
        },{
            $pull:{
                myLists: listId
            }
        });
        
        //remove the list from List model
        const deletedList = await List.findOneAndDelete({
            _id: listId
        })

      //add to activity model 
        const newActivity = await new Activity({
            activityName: "REMOVE_LIST",
            actionType: "removed",
            userId: userId,
            listId: listId
        })
        await newActivity.save()

        res.json(deletedList)
    } catch (error) {
        res.json(error.message)
    }
})



module.exports = router;