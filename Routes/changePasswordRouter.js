const express = require("express");
const controller = require("../Controller/changePasswordController");
const {
    changeValidator,

} = require("./../Midelwares/validations/changePasswordValidator");
const validatonResult = require("../Midelwares/validations/validatorResult");
const router = express.Router();

router.patch("/changePassword", changeValidator, validatonResult, controller.changePassword);

module.exports = router;
