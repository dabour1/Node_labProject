const { body, param, query } = require("express-validator");

exports.changeValidator = [
  body("newPassword").isString()
    .withMessage("password should be string")
    .isLength({ min: 5 })
    .withMessage("password lenght>5"),
  body("email").isEmail()
    .withMessage("invalid mail"),
];