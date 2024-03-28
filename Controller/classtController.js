
const ClassSchema = require("./../Model/classSchema");

const teacherSchema = require("./../Model/teacherSchema");

exports.getAllClasss = (req, res, next) => {

  ClassSchema.find()
    .then(data => {
      res.status(200).json({ data: data });
    })
    .catch(error => next(error))


};

exports.getClassById = (req, res, next) => {

  ClassSchema.findById(req.params._id)
    .then(data => {
      res.status(200).json({ data: data });
    })
    .catch(error => next(error))
};

exports.insertClass = (req, res, next) => {

  let object = new ClassSchema(req.body);
  object
    .save()
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => next(error));
};

exports.updateClass = (req, res, next) => {
  ClassSchema.findByIdAndUpdate(req.body._id, req.body, { new: true }).then(data => {
    res.status(200).json({ message: 'updated', data })
  })
    .catch(error => {
      next(error)
    })
};
exports.deleteClassById = (req, res, next) => {
  ClassSchema.findByIdAndDelete(req.params._id).then(data => {
    res.status(200).json({ message: 'deleted', data })
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
exports.getTeacherById = (req, res, next) => {
  teacherSchema.findById(req.params._id)
    .then(data => {
      res.status(200).json({ data: data });
    })
    .catch(error => next(error))
};

exports.getSupervisors = (req, res, next) => {

  ClassSchema.find({}, { children: 0, _id: 0, __v: 0 }).populate({ path: "supervisor", select: { fullname: 1 } })
    .then(data => {
      res.status(200).json({ data: data });
    })
    .catch(error => next(error))


};

exports.getChildrenInfo = (req, res, next) => {
  ClassSchema.find({ _id: req.params._id }).populate({ path: "children" }).then(data => {
    res.status(200).json({ data })
  })
    .catch(error => next(error))
};
exports.getsupervisorInfo = (req, res, next) => {
  ClassSchema.find({ _id: req.params._id }).populate({ path: "supervisor" }).then(data => {
    res.status(200).json({ data })
  })
    .catch(error => next(error))
};