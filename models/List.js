const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ListSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  
  description: {
    type: String,
    required: true
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'   
  },

  // bookItems:{
  //   type: Schema.Types.ObjectId,
  //   ref: 'books' 
  // },

  // followers:{
  //   type: Schema.Types.ObjectId,
  //   ref: 'users' 
  // },
   
},{
  timestamps: true
})

module.exports = List = mongoose.model("List", ListSchema)