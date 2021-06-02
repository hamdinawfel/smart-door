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
  phone:{
    type: String,
  },
  password: {
    type: String,
    required:true
  },
  admin:   {
    type: Boolean,
    default: false
  },
  resetLink: {
  type: String,
  default: '',
  },
  }, {
  timestamps: true
});

module.exports = mongoose.model("users", userSchema);