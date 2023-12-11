const router = require("express").Router();
const list = require("../models").shoppinglist;


router.use((req, res, next) => {
  console.log("in list router");
  next();

})







module.exports = router;

