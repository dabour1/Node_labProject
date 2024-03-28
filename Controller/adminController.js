const adminSchema = require("./../Model/adminSchema");
const bcrypt = require('bcrypt');
const multer = require("multer");
const addImage = require("./addImagesjs");
const _path = require('path')

exports.getAllAdmins = (req, res, next) => {
  adminSchema.find()
    .then(data => {
      res.status(200).json({ data: data });
    })
    .catch(error => next(error))

};
exports.insertAdmin = async (req, res, next) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  req.body.image = addImage.addImageToDataBase(req.file, req.body._id);
  let object = new adminSchema(req.body);
  object
    .save()
    .then((data) => {
      addImage.addImageToFolder(req.file, "admins", "insert", data, res)
    })
    .catch((error) => next(error));


};

exports.updateAdmin = (req, res, next) => {
  if (req.file) {
    req.body.image = `${req.file.fieldname}_${req.body._id}_${_path.extname(req.file.originalname)}`;
  }
  adminSchema.findByIdAndUpdate(req.body._id, req.body, { new: true }).then(data => {
    if (req.file) {
      addImage.addImageToFolder(req.file, "admins", "Update", data, res)
    }
    else {
      res.status(200).json({ message: 'updated', data })
    }
  })
    .catch(error => {
      next(error)
    })
};

