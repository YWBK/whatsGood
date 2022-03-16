const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BookSchema = new Schema({ 
  volumeId:{
    type: String,
    required: true
  },

  rating:[{
    Type: Number,
    default: 0
  }],
  
  userID:[{
    type: Schema.Types.ObjectId,
    ref: 'User' 
  }],

  listID:[{
    type: Schema.Types.ObjectId,
    ref: 'List' 
  }],

  inLists:[{
    type: Schema.Types.ObjectId,
    ref: 'List' 
  }],
   
},{
  timestamps: true
})

module.exports = Book = mongoose.model("Book", BookSchema)