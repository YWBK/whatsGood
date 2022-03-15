const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const passport = require('passport');
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const lists = require("./routes/api/lists")
const bodyParser = require('body-parser');
const { application } = require('express');
const search = require('./routes/api/search')
const List = require('./models/List')
const User = require("./models/User")    //test user Model. to be deleted


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



//test route for creating a list
// app.get("/test_new_lists", async(req, res)=>{
//   const list = await new List({
//     name: "My wish list #3",
//     description: "These are the books that I want to read next",
//     owner: "622eba23f15d913d4bff00c2"
//   })

//   await list.save()
//   res.send("created")
// })

//test route for creating a user
// app.get("/test_new_user", (req, res) => {
//   const user =  new User({
//     username: 'steven3',
//     email: 'steven@yahoo.com ',
//     password: '123456',
//     followingLists: ["6230ab5ef775b87d4768abb1", "6230acf4ef1e34a8bcd986a2"]
//   })

//   user.save();
//   res.send("created")
// })

// //test route to get a user along with followinglists
// app.get("/test_user_lists", async (req, res) =>{
//     const user = await User.findById("6230b8304cac293c0eb48a3f").populate("followingLists");

//     res.json(user)
// })


//test route to update a user's followingList
// app.get("/test_user_lists_update", async (req, res) =>{
//   await User.updateOne(
//     {},
//     { "$pull": { "followingLists":{ "_id": "6230acf4ef1e34a8bcd986a2" } } },
//     false, // Upsert
//     true, // Multi
//   );
            
//  res.json("done!@") 
// //  res.catch(err=>res.send(err))

// })




const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));