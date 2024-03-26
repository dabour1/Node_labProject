const express = require("express");
const controller = require("../Controller/classtController");
const {
  insertValidator,
  updateValidator,
  deleteGetOneValidator,

} = require("./../Midelwares/validations/classValidation");
const validatonResult = require("../Midelwares/validations/validatorResult");
const router = express.Router();
const { isAdmin,isAuthorizatied } = require("./../Midelwares/authenticationMW");
router
  .route("/class")
  .get(isAuthorizatied,controller.getAllClasss)
  .post(isAdmin,insertValidator, validatonResult,controller.insertClass)
  .patch(isAdmin,updateValidator, validatonResult,controller.updateClass);
  router
  .route("/class/:_id")
  .get(isAuthorizatied,deleteGetOneValidator,validatonResult,controller.getClassById)
  .delete(isAdmin,deleteGetOneValidator, validatonResult,controller.deleteClassById);
 
  router.get("/class/child/:_id", isAuthorizatied,controller. getChildrenInfo);
  router.get("/class/teacher/:_id",isAuthorizatied, controller.getsupervisorInfo);
module.exports = router; 