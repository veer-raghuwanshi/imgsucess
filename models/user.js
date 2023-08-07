const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "please provide your name"],
  },
  email: {
    type: String,
    required: [true, "please provide your email"],
  },
  password:{
    type :String

  },
  image: String,
});

module.exports = mongoose.model("user", UserSchema);
