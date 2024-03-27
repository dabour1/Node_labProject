const express = require("express");
const controller = require("../Controller/adminController");
const { isAdmin } = require("./../Midelwares/authenticationMW");
const {
  insertValidator,
  updateValidator,

} = require("./../Midelwares/validations/adminValidator");
const validatonResult = require("../Midelwares/validations/validatorResult");
const upload = require('../Controller/upload');
const router = express.Router();
router
  .route("/admins")
  .get(isAdmin, controller.getAllAdmins)
  .post(isAdmin, insertValidator, validatonResult, upload.single("user"), controller.insertAdmin)
  .patch(isAdmin, updateValidator, validatonResult, upload.single("user"), controller.updateAdmin);


module.exports = router;
