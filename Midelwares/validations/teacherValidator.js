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
    .withMessage(" teacher fullname lenght>5"),
  body("email").isEmail()
    .withMessage("invalid mail").custom(async (value) => {
      const adminObjects = await adminSchema.find({ email: value });
      const teacherObjects = await teacherSchema.find({ email: value });

      if (adminObjects.length > 0 || teacherObjects.length > 0) {
        return Promise.reject("Email already exists");
      }

      return true;
    }),

  body("image").isString()
    .withMessage("invalid mail").withMessage("teacher image should be string"),

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
      const adminObjects = await adminSchema.find({ email: value });
      const teacherObjects = await teacherSchema.find({ email: value });

      if (adminObjects.length > 0 || teacherObjects.length > 0) {
        return Promise.reject("Email already exists");
      }

      return true;
    }),

  body("image").isString().optional()
    .withMessage("invalid mail").withMessage("teacher image should be string"),


];
exports.deleteGetOneValidator = [
  param("_id").isMongoId()
    .withMessage(" id should be int"),
];