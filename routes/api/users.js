const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));


// router.get("/email", (req, res) => {
//     User.findOne({ email: req.body.email})
//         .then( user => {
//             user ? res.status(400).json({email: 'Email is taken'}) : null;
//         })
// })
// router.get("/username", (req, res) => {
//     User.findOne({ username: req.body.username})
//         .then( user => {
//             user ? res.status(400).json({username: 'Username is taken'}) : null;
//         })
// })


router.post('/signup', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                res.status(400).json({ email: 'Email is taken' })
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
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
})

module.exports = router;