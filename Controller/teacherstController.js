
const teacherSchema = require("./../Model/teacherSchema");
const bcrypt = require('bcrypt');
const addImageToDataBase = require("./addImageToDataBase");

exports.getAllTeachers = (req, res, next) => {

  teacherSchema.find()
    .then(data => {
      res.status(200).json({ data: data });
    })
    .catch(error => next(error))
};

exports.getTeacherById = (req, res, next) => {
  teacherSchema.findById(req.params._id)
    .then(data => {
      res.status(200).json({ data: data });
    })
    .catch(error => next(error))
};

exports.insertTeacher = async (req, res, next) => {

  req.body.image = addImageToDataBase(req.file.filename);

  req.body.password = await bcrypt.hash(req.body.password, 10)
  let object = new teacherSchema(req.body);
  object
    .save()
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => next(error));
};

exports.updateTeacher = (req, res, next) => {
  if (req.file) {
    req.body.image = addImageToDataBase(req.file.filename);
  }
  teacherSchema.findByIdAndUpdate(req.body._id, req.body, { new: true }).then(data => {
    res.status(200).json({ message: 'updated', data })
  })
    .catch(error => {
      next(error)
    })
};
exports.deleteTeacherById = (req, res, next) => {
  teacherSchema.findByIdAndDelete(req.params._id).then(data => {
    res.status(200).json({ message: 'deleted', data })
  })
    .catch(error => next(error))
};

