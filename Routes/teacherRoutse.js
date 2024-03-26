const express = require("express");
const controller = require("../Controller/teacherstController");
const {getSupervisors} = require("../Controller/classtController");
const {
  insertValidator,
  updateValidator,
  deleteGetOneValidator,
} = require("./../Midelwares/validations/teacherValidator");
const validatonResult = require("../Midelwares/validations/validatorResult");
const { isAdmin,isAuthorizatied } = require("./../Midelwares/authenticationMW");
const router = express.Router();

router
  .route("/teachers")
  .get(isAuthorizatied,controller.getAllTeachers)
  .post(isAdmin,insertValidator, validatonResult, controller.insertTeacher)
  .patch(isAdmin,updateValidator,validatonResult,controller.updateTeacher);
  router.get("/teachers/supervisors",  getSupervisors);
  router
  .route("/teachers/:_id")
  .get(isAuthorizatied,deleteGetOneValidator,validatonResult,controller.getTeacherById)
  .delete(isAdmin,deleteGetOneValidator, validatonResult,controller.deleteTeacherById);
   

 
 

module.exports = router;

 
