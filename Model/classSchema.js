const mongoose = require("mongoose");
const sequence = require("mongoose-sequence")(mongoose);

const schema = new mongoose.Schema({
  _id: Number,
  name: { type: String },
  supervisor: { type: mongoose.Types.ObjectId, ref: "teachers", unique: true },
  children: [{ type: Number, ref: "childrens" }]
});
schema.plugin(sequence);

module.exports = mongoose.model("classes", schema);

