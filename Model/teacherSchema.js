const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, required: false },
  fullname: { type: String },
  password: { type: String },
  email: { type: String, unique: true },
  image: { type: String },

});



module.exports = mongoose.model("teachers", schema);
