const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const keys = require('../../config/keys');
const validateSignupInput = require('../../validation/signup');

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.post('/signup', (req, res) => {
    const { errors, isValid } = validateSignupInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.find({ $or:[{email: req.body.email}, {username: req.body.username }]})
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
                                const payload = { id: user.id, username: user.username};

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
    const email = req.body.email;
    // const username = req.body.username;
    const password = req.body.password;

    User.find({ $or:[{email: req.body.email}, {username: req.body.username }]})
        .then(user => {
            if (!user) {
                return res.status(404).json({email: 'User not found'});
            }

            bcrypt
                .compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = { id: user.id, username: user.username };

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
                        return res.status(400).json({password: 'Incorrect password'});
                    }
                })
        })
})

module.exports = router;