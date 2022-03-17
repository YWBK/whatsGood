const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ActivitySchema = new Schema({
  activityName: {
    type: String,
    required: true
  },

  actionType: {
    type: String,
    required: true
  },
    
  userId:[{
    type: Schema.Types.ObjectId,
    ref: 'User' 
  }],

  userIdBeingFollowed:[{
    type: Schema.Types.ObjectId,
    ref: 'User' 
  }],

  bookId:[{
    type: Schema.Types.ObjectId,
    ref: 'Book' 
  }],

  listId:[{
    type: Schema.Types.ObjectId,
    ref: 'List' 
  }],
   
},{
  timestamps: true
})

module.exports = Activity = mongoose.model("Activity", ActivitySchema)