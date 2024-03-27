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

  // body("image").isString()
  //   .withMessage("invalid mail").withMessage("admin image should be string"),

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
    .custom(async (value) => {
      const adminObjects = await adminSchema.find({ email: value });
      const teacherSchema = await sellerSchema.find({ email: value });

      if (adminObjects.length > 0 || teacherSchema.length > 0) {
        return Promise.reject("Email already exists");
      }

      return true;
    }),

  body("image").isString().optional()
    .withMessage("invalid mail").withMessage("admin image should be string"),


];
exports.deleteGetOneValidator = [
  param("_id").isInt()
    .withMessage(" id should be int"),
];