const childSchema = require("./../Model/childSchema");
const addImageToDataBase = require("./addImageToDataBase.js");


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
  req.body.image = addImageToDataBase(req.file.filename);

  let object = new childSchema(req.body);
  object
    .save()
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => next(error));
};

exports.updateChild = (req, res, next) => {
  if (req.file) {
    req.body.image = addImageToDataBase(req.file.filename);
  }
  childSchema.findByIdAndUpdate(req.body._id, req.body, { new: true }).then(data => {
    res.status(200).json({ message: 'updated', data })
  })
    .catch(error => {
      next(error)
    })

};
exports.deleteChildById = (req, res, next) => {
  childSchema.findByIdAndDelete(req.params._id).then(data => {
    res.status(200).json({ message: 'deleted', data })
  })
    .catch(error => next(error))
};
