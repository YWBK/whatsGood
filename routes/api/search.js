const express = require('express');
const router = express.Router();
const googleApi = require('../../utils/google_api')
const apiKey = require("../../config/keys")


router.get("/", (req, res) => {
  // const searchParams = req.body.split(" ").join("+");
  const searchParams = "Harry+Potter";
  debugger
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchParams}Type=books&orderBy=newest&key=${apiKey}`)  
    .then(data=> res.json(data));
})

module.exports = router