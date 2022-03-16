const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const passport = require('passport');
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const lists = require("./routes/api/lists")
const books = require("./routes/api/books")
const activities = require("./routes/api/activities")
const ratings = require("./routes/api/ratings")

const bodyParser = require('body-parser');
const { application } = require('express');
const search = require('./routes/api/search')


mongoose
.connect(db, { useNewUrlParser: true })
.then(() => console.log("Connected to MongoDB successfully"))
.catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

// app.get("/", (req, res) => res.send('This is whatsGood today'));
app.use(passport.initialize());
require('./config/passport')(passport);

app.use("/api/search", search);
app.use("/api/users", users);
app.use("/api/lists", lists);
app.use("/api/books", books);
app.use("/api/activities", activities);
app.use("/api/ratings", ratings);




const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));