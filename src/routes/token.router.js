"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const token = require("../controllers/token.controller");

const { isAdmin } = require('../middlewares/permissions')// içiçe middleware olduğundan destruc ile alındı.

/* ------------------------------------------------------- */
//?genel yazım hepsinin önğne isAdmin kontrolü yazıldı uzun yazım
// router.route("/")
//     .get(isAdmin, token.list)
//     .post(isAdmin, token.create);

// router.route("/:id")
//   .get(isAdmin, token.read)
//   .put(isAdmin, token.update)
//   .patch(isAdmin, token.update)
//   .delete(isAdmin, token.delete);

/* ------------------------------------------------------- */

 router.use(isAdmin) // hepsine ortak olarak isAdmin' i tanımlamış olduk bu sayede aşağıdaki tüm roterlarada isAdmin kont yapıyor

router.route("/")
  .get(token.list)
  .post(token.create);

router.route("/:id")
  .get(token.read)
  .put(token.update)
  .patch(token.update)
  .delete(token.delete);

/* ------------------------------------------------------- */

module.exports = router;

