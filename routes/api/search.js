const express = require('express');
const router = express.Router();
const apiKey = require("../../config/google_api_key")


router.get("/", (req, res) => {
  // const searchParams = req.body.split(" ").join("+");
  const searchParams = "Harry+Potter";
  debugger
  return res.json({msg: "receive"})
  // fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchParams}Type=books&orderBy=newest&key=${apiKey}`)  
  //   .then(data=> res.json(data));
})

module.exports = router