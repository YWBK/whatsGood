const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },    
    favCategories:{
      type: [String]
    },

    myLists:[{
      type: Schema.Types.ObjectId,
      ref: 'List' 
    }],
    followingLists:[{
      type: Schema.Types.ObjectId,
      ref: 'List' 
    }],
    followingUsers:[{
      type: Schema.Types.ObjectId,
      ref: 'User' 
    }],
    bookRatings:[{
      type: Schema.Types.ObjectId,
      ref: 'Rating' 
    }],

  }, {
    timestamps: true
  })

module.exports = User = mongoose.model('User', UserSchema);