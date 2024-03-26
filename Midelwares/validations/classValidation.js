const { body, param, query } = require("express-validator");
const childSchema = require("./../../Model/childSchema");
const teacherSchema = require("./../../Model/teacherSchema");
const classSchema = require("./../../Model/classSchema");

exports.insertValidator = [

  body("name")
    .isAlpha()
    .withMessage("class name should be string")
    .isLength({ min: 2 })
    .withMessage(" class name lenght>5"),
  body("supervisor").isMongoId().withMessage(" supervisor id should be int").custom(async (value) => {
    const teacherIDS = await teacherSchema.find({}, { _id: 1 });
    const classSupervisor = await classSchema.find({}, { supervisor: 1, _id: 0 });
    if (!teacherIDS.find(rec => rec._id == value)) {
      throw new Error("invalid input supervisor must be exist before add to class ");
    }
    if (classSupervisor.find(rec => rec.supervisor == value)) {
      throw new Error("invalid input this supervisor's id already exist in another class ");

    }
    return true;
  }),
  body("children").isArray()
    .withMessage("class classren should be Array").custom(async (value) => {
      const classIDS = await childSchema.find({}, { _id: 1 });
      const classchidren = await classSchema.find({}, { children: 1, _id: 0 });

      for (let i = 0; i < value.length; i++) {
        if (typeof (value[i]) != "number") {

          throw new Error("class children should contain only integers");
        }
        if (!classIDS.find(rec => rec._id == value[i])) {
          throw new Error("invalid input child must be exist before add to class ");
        }
        if (!classIDS.find(rec => rec._id == value[i])) {
          throw new Error("invalid input child must be exist before add to class ");
        }
        classchidren.forEach(rec => {
          if (rec.children.includes(value[i])) {
            throw new Error("invalid input this children array contain ids that already exist in another class");
          }
        })

      }

      return true;
    }),
];
exports.updateValidator = [

  body("name").optional()
    .isAlpha()
    .withMessage("class name should be string")
    .isLength({ min: 2 })
    .withMessage(" class name lenght>5"),
  body("supervisor").optional().isMongoId().withMessage(" supervisor id should be int").custom(async (value) => {
    const teacherIDS = await teacherSchema.find({}, { _id: 1 });
    const classSupervisor = await classSchema.find({}, { supervisor: 1, _id: 0 });
    if (!teacherIDS.find(rec => rec._id == value)) {
      throw new Error("invalid input supervisor must be exist before add to class ");
    }
    if (classSupervisor.find(rec => rec.supervisor == value)) {
      throw new Error("invalid input this supervisor's id already exist in another class ");

    }
    return true;
  }),
  body("children").optional().isArray()
    .withMessage("class classren should be Array").custom(async (value) => {
      const classIDS = await childSchema.find({}, { _id: 1 });
      const classchidren = await classSchema.find({}, { children: 1, _id: 0 });

      for (let i = 0; i < value.length; i++) {
        if (typeof (value[i]) != "number") {

          throw new Error("class children should contain only integers");
        }
        if (!classIDS.find(rec => rec._id == value[i])) {
          throw new Error("invalid input child must be exist before add to class ");
        }
        if (!classIDS.find(rec => rec._id == value[i])) {
          throw new Error("invalid input child must be exist before add to class ");
        }
        classchidren.forEach(rec => {
          if (rec.children.includes(value[i])) {
            throw new Error("invalid input this children array contain ids that already exist in another class");
          }
        })

      }

      return true;
    }),
];


exports.deleteGetOneValidator = [
  param("_id").isInt()
    .withMessage(" id should be int"),
];
