const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
      default: '',
  },
  email:{
    type: String,
    required:true,
    unique:true
  },
  password: {
    type: String,
    required:true
  },
  phone:{
    type: String,
  },
  admin:   {
    type: Boolean,
    default: true
  },
  root:   {
    type: Boolean,
    default: false
  },
  }, {
  timestamps: true
});

module.exports = mongoose.model("users", userSchema);