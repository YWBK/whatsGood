const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BookSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  

  volumeId:{

  },
  
  inLists:[{
    type: Schema.Types.ObjectId,
    ref: 'List' 
  }],
  
   
},{
  timestamps: true
})

module.exports = Book = mongoose.model("Book", ListSchema)