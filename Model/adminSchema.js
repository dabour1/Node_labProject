const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id: { type: Number },
  fullname: { type: String },
  password: { type: String },
  email: { type: String, unique: true },
  image: { type: String },

});



module.exports = mongoose.model("admins", schema);
