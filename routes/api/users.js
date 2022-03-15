const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../../models/User');
const keys = require('../../config/keys');
const validateSignupInput = require('../../validation/signup');
const validateLoginInput = require('../../validation/login');

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

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json({
            _id: user.id,
            username: user.username,
            email: user.email
        }))
        .catch(err => res.status(404).json({ user: 'No user found' }))
})

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

    User.find({ $or:[{email}, {username}]})
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