const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const RatingSchema = new Schema({
  rating: {
    type: Number,
    required: true
  },

  bookId:[{
    type: Schema.Types.ObjectId,
    ref: 'Book' 
  }],

  userId:[{
    type: Schema.Types.ObjectId,
    ref: 'User' 
  }],
   
},{
  timestamps: true
})

module.exports = Rating = mongoose.model("Rating", RatingSchema)