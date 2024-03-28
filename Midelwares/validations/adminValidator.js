const { body, param, query } = require("express-validator");
const adminSchema = require("./../../Model/adminSchema");
const teacherSchema = require("./../../Model/teacherSchema");


exports.insertValidator = [
  body("_id")
    .isInt()
    .withMessage("admin _id should be int"),
  body("fullname")
    .isAlpha()
    .withMessage("admin fullname should be string")
    .isLength({ min: 3 })
    .withMessage(" admin fullname lenght>5"),
  body("password").isString()
    .withMessage("admin password should be string")
    .isLength({ min: 5 })
    .withMessage(" admin password lenght>5"),
  body("email").isEmail()
    .withMessage("invalid mail").custom(async (value) => {
      const adminObjects = await adminSchema.find({ email: value });
      const teacherObjects = await teacherSchema.find({ email: value });
      if (adminObjects.length > 0 || teacherObjects.length > 0) {
        return Promise.reject("Email already exists");
      }

      return true;
    }),

];

exports.updateValidator = [
  body("_id")
    .isInt()
    .withMessage("admin id should be int"),
  body("fullname")
    .optional()
    .isAlpha()
    .withMessage("admin fullname should be string")
    .isLength({ min: 5 })
    .withMessage(" admin fullname lenght>5"),
  body("password").isString().optional()
    .withMessage("admin password should be string")
    .isLength({ min: 5 })
    .withMessage(" admin fullname lenght>5"),
  body("email")
    .isEmail()
    .optional()
    .withMessage("invalid email")
    .custom(async (value, { req }) => {
      const adminObject = await adminSchema.findOne({ email: value }, { email: 1, _id: 0 });
      const teacherObject = await teacherSchema.find({ email: value });
      const currntMile = await adminSchema.findOne({ _id: req.body._id }, { email: 1, _id: 0 });
      if ((adminObject && adminObject.email != currntMile.email) || teacherObject.length > 0) {
        return Promise.reject("Email already exists");
      }

      return true;
    }),



];
exports.deleteGetOneValidator = [
  param("_id").isInt()
    .withMessage(" id should be int"),
];