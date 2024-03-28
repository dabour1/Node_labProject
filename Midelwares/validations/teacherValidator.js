const { body, param, query } = require("express-validator");
const adminSchema = require("./../../Model/adminSchema");
const teacherSchema = require("./../../Model/teacherSchema");


exports.insertValidator = [
  body("_id").optional()
    .isMongoId()
    .withMessage("teacher _id should be MongoId"),

  body("fullname")
    .isAlpha()
    .withMessage("teacher fullname should be string")
    .isLength({ min: 3 })
    .withMessage(" teacher fullname lenght>5"),
  body("password").isString()
    .withMessage("teacher password should be string")
    .isLength({ min: 5 })
    .withMessage(" teacher password lenght>5"),
  body("email").isEmail()
    .withMessage("invalid mail").custom(async (value, { req }) => {
      const adminObjects = await adminSchema.findOne({ email: value });
      const teacherObjects = await teacherSchema.findOne({ email: value });

      if (adminObjects || teacherObjects) {
        return Promise.reject("Email already exists");
      }

      return true;
    }),


];

exports.updateValidator = [
  body("_id")
    .isMongoId()
    .withMessage("teacher id shoukd be MongoId"),
  body("fullname")
    .optional()
    .isAlpha()
    .withMessage("teacher fullname should be string")
    .isLength({ min: 5 })
    .withMessage(" teacher fullname lenght>5"),
  body("password").isString().optional()
    .withMessage("teacher password should be string")
    .isLength({ min: 5 })
    .withMessage(" teacher fullname lenght>5"),
  body("email").isEmail().optional()
    .withMessage("invalid mail").custom(async (value) => {

      const adminObject = await adminSchema.findOne({ email: value }, { email: 1, _id: 0 });
      const teacherObject = await teacherSchema.findOne({ email: value }, { email: 1, _id: 0 });
      const currntMile = await teacherSchema.findOne({ _id: req.body._id }, { email: 1, _id: 0 });
      if ((teacherObject && teacherObject.email != currntMile.email) || adminObject) {
        return Promise.reject("Email already exists");
      }

      return true;



    }),


];
exports.deleteGetOneValidator = [
  param("_id").isMongoId()
    .withMessage(" id should be int"),
];