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
    admin:   {
      type: Boolean,
      default: false
  },
    balance: {
    type: Number,
    default: 0.00,
    },
    resetLink: {
    type: String,
    default: '',
    },
  }, {
  timestamps: true
});

module.exports = mongoose.model("users", userSchema);