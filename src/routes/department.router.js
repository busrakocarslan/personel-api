"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const department = require("../controllers/department.controller");

// const { isAdmin, isAdminOrLead, isLogin } = require('../middlewares/permissions') daha kısa yöntem destruc ile ancak nereden geldiğini daha net anla diye böyle yazdım
const permissions = require('../middlewares/permissions')

/* ------------------------------------------------------- */

router
  .route("/")
  .get(permissions.isLogin, department.list)// login olan departmanları listeleyebilir. 
  .post(permissions.isAdmin, department.create);// sadece admin depRTMAN create edebilir. 
// router
//   .route("/")
//   .get( department.list)
//   .post( department.create);

router.route("/:id")
  .get(permissions.isLogin, department.read)// sadece login olan departman detayı okuyabilir
  .put(permissions.isAdmin, department.update)// sadece admin olan departman update edebilir 
  .patch(permissions.isAdmin, department.update)// sadece admin olan departman update edebilir 
  .delete(permissions.isAdmin, department.delete);// sadece admin olan departman delete edebilir 
// router
//   .route("/:id")
//   .get(department.read)
//   .put(department.update)
//   .patch(department.update)
//   .delete(department.delete);

router.get("/:id/personnels", permissions.isAdminOrLead, department.personnels);// departmen içindeki personellei admin ya da lead listeleyebilir. 

module.exports = router;
