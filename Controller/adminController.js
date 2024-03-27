const adminSchema = require("./../Model/adminSchema");
const bcrypt = require('bcrypt');
const multer = require("multer");
const addImageToDataBase = require("./addImageToDataBase.js");


exports.getAllAdmins = (req, res, next) => {
  adminSchema.find()
    .then(data => {
      res.status(200).json({ data: data });
    })
    .catch(error => next(error))

};
exports.insertAdmin = async (req, res, next) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  req.body.image = addImageToDataBase(req.file.filename);
  let object = new adminSchema(req.body);
  object
    .save()
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => next(error));


};

exports.updateAdmin = (req, res, next) => {
  if (req.file.filename) {
    req.body.image = addImageToDataBase(req.file.filename);
  }
  adminSchema.findByIdAndUpdate(req.body._id, req.body, { new: true }).then(data => {
    res.status(200).json({ message: 'updated', data })
  })
    .catch(error => {
      next(error)
    })
};

