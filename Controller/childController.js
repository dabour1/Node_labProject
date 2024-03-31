const childSchema = require("./../Model/childSchema");
const classSchema = require("./../Model/classSchema");
const addImage = require("./addImagesjs");
const _path = require('path')

exports.getAllChilds = (req, res, next) => {
  childSchema.find()
    .then(data => {
      res.status(200).json({ data: data });
    })
    .catch(error => next(error))

};

exports.getChildById = (req, res, next) => {
  childSchema.findById(req.params._id)
    .then(data => {
      res.status(200).json({ data: data });
    })
    .catch(error => next(error))

};

exports.insertChild = (req, res, next) => {
  req.body.image = addImage.addImageToDataBase(req.file, req.body._id);

  let object = new childSchema(req.body);
  object
    .save()
    .then((data) => {
      addImage.addImageToFolder(req.file, "children", "insert", data, res)
    })
    .catch((error) => next(error));
};

exports.updateChild = (req, res, next) => {
  if (req.file) {
    req.body.image = `${req.file.fieldname}_${req.body._id}_${_path.extname(req.file.originalname)}`;
  }
  childSchema.findByIdAndUpdate(req.body._id, req.body, { new: true }).then(data => {
    addImage.addImageToFolder(req.file, "children", "Update", data, res)
  })
    .catch(error => {
      next(error)
    })

};
exports.deleteChildById = (req, res, next) => {
  childSchema.findByIdAndDelete(req.params._id)
    .then(childData => {
      classSchema.updateOne({ children: req.params._id }, { $pull: { children: req.params._id } })
        .then(data => {
          res.status(200).json({ message: 'deleted', childData })
        })
    })
    .catch(error => next(error))
};
