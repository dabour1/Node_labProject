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
  .post(isAdmin, upload.single("admin"), insertValidator, validatonResult, controller.insertAdmin)
  .patch(isAdmin, upload.single("admin"), updateValidator, validatonResult, controller.updateAdmin);


module.exports = router;
