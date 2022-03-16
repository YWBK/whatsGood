const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BookSchema = new Schema({ 
  volumeId:{
    type: String,
    required: true
  },

  rating:[{
    Type: Number
  }],
  
  inLists:[{
    type: Schema.Types.ObjectId,
    ref: 'List' 
  }],
   
},{
  timestamps: true
})

module.exports = Book = mongoose.model("Book", BookSchema)