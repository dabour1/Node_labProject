const { body, param, query } = require("express-validator");

exports.insertValidator = [
  body("_id")
    .isInt()
    .withMessage("child id should be int"),
  body("fullname")
    .isAlpha()
    .withMessage("child fullname should be string")
    .isLength({ min: 5 })
    .withMessage(" child fullname lenght>5"),
  body("age").isInt().withMessage(" child age should be int").custom((age) => {
    if (age < 0) {
      throw new Error('child id should be a positive int');
    }
    return true;
  }),
  body("level").isString()
    .withMessage("child level should be string"),
  body("address").optional().isObject()
    .withMessage("child image should be Object"),
  body("address.city").isString().withMessage("child city should be string"),
  body("address.street").isString().withMessage("child street should be string"),
  body("address.building").isInt().withMessage("child building should be int"),
];

exports.updateValidator = [
  body("_id")
    .isInt()
    .withMessage("child id should be int"),
  body("fullname").optional()
    .isAlpha()
    .withMessage("child fullname should be string")
    .isLength({ min: 5 })
    .withMessage(" child fullname lenght>5"),
  body("age").optional().isInt().custom((age) => {
    if (age < 0) {
      throw new Error('child id should be a positive integer');
    }
    return true;
  }),
  body("level").optional().isString()
    .withMessage("child level should be string"),
  body("address").optional().isObject()
    .withMessage("child image should be Object"),
  body("address.city").optional().isString().withMessage("child city should be string"),
  body("address.street").optional().isString().withMessage("child street should be string"),
  body("address.building").optional().isInt().withMessage("child building should be int"),
];
exports.deleteGetOneValidator = [
  param("_id").isInt()
    .withMessage(" id should be int"),
];
