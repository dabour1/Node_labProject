const mongoose = require("mongoose");
const addressSchema = require("./addressSchema");

const schema = new mongoose.Schema({
  _id: Number,
  fullname: { type: String, unique: true },
  age: { type: Number },
  level: { type: String },
  address: addressSchema
});

module.exports = mongoose.model("childrens", schema);