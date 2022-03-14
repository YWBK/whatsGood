const express = require('express');
const router = express.Router();
const apiKey = require("../../config/google_api_key").key
const axio = require("axios")

router.post("/", (req, res, next) => {
  const searchParams = !req.body ?  res.send('searchQuary is blank') : req.body.searchString.split(" ").join("+");
  axio.get(`https://www.googleapis.com/books/v1/volumes?q=${searchParams}Type=books&key=${apiKey}`)
      .then(response=> {
        res.json(response.data.items)
      })
      .catch(err => next(err))
    
})

module.exports = router
