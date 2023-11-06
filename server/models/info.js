const mongoose = require("mongoose");

const infoSchema = mongoose.Schema ({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  contact:{
    type: String, 
    maxLength:100
  },
  description:{
    type: String,
    maxLength:1000
  },
  language:{
    type: String, 
    maxLength:100
  },
},
{
  timestamps: true
});

module.exports = mongoose.model("Info", infoSchema);