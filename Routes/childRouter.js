const express = require("express");
const router = express.Router();
const controller = require("../Controller/childController");
const {
  insertValidator,
  updateValidator
  ,deleteGetOneValidator
} = require("./../Midelwares/validations/childValidation");
const validatonResult = require("../Midelwares/validations/validatorResult");
const { isAdmin,isAuthorizatied } = require("./../Midelwares/authenticationMW");



router
  .route("/child")
  .get( isAuthorizatied ,controller.getAllChilds)
  .post(isAdmin,insertValidator, validatonResult,controller.insertChild)
  .patch(isAdmin,updateValidator,validatonResult,controller.updateChild);
  router
  .route("/child/:_id")
  .get(isAuthorizatied,deleteGetOneValidator,validatonResult,controller.getChildById)
  .delete(isAdmin, deleteGetOneValidator,validatonResult, controller.deleteChildById);
 
module.exports = router;

 