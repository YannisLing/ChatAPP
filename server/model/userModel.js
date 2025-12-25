const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min:2,
    max:3,
    unique:true,
  },
  email:{
    type:String,
    required: true,
    unique:true,
    max:50,
  },
  password:{
    type: String,
    required: true,
    min:8,
  },
  isAvatarImageSet:{
    type:Boolean,
    default:false,

  },
  abvtarImage:{
    type:String,
    default:"",

  },

});

module.exports = mongoose.model("Users", userSchema);