const mongoose = require ('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required:[true, 'please add a name']
  },
  email: {
    type: String,
    required:[true, 'please add an email'],
    unique: true
  },
  password: {
    type: String,
    required:[true, 'please add a password']
  },
  lastLogin: {
    type: Date,
  },
  toggleChat: {
    type: Boolean,
    default: false,
  },
  contact:{
    type: String, 
    maxLength:100
  },
  description:{
    type: String,
    maxLength:100
  },
  language:{
    type: String, 
    maxLength:100
  },
},
{
  timestamps: true
})

userSchema.virtual("url").get(function(){
  return `/users/info/${this._id}`;
});

module.exports = mongoose.model('User', userSchema)