const express = require("express");
const controller = require("../Controller/adminController");
const { isAdmin } = require("./../Midelwares/authenticationMW");
const {
  insertValidator,
  updateValidator,

} = require("./../Midelwares/validations/adminValidator");
const validatonResult = require("../Midelwares/validations/validatorResult");
const router = express.Router();
router
  .route("/admins")
  .get(isAdmin, controller.getAllAdmins)
  .post(isAdmin, insertValidator, validatonResult, controller.insertAdmin)
  .patch(isAdmin, updateValidator, validatonResult, controller.updateAdmin);


module.exports = router;
