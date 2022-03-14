const express = require('express');
const router = express.Router();
const keys = require("../../config/keys")
const axio = require("axios")

router.post("/", (req, res, next) => {
  const searchParams = !req.body ?  res.send('searchQuary is blank') : req.body.searchString.split(" ").join("+");
  axio.get(`https://www.googleapis.com/books/v1/volumes?q=${searchParams}Type=books&key=${keys.googleApiKey}`)
      .then(response=> {
        res.json(response.data.items)
      })
      .catch(err => next(err))
    
})

module.exports = router
