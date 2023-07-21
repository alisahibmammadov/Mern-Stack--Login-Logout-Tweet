const express = require("express");
const {
  loginKullanici,
  signupKullanici,
} = require("../controllers/kullaniciController.js");

const router = express.Router();


router.post("/login",loginKullanici)
router.post("/signup",signupKullanici)








module.exports = router
