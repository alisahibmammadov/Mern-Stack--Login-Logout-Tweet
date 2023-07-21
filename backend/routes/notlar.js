const express = require("express");
const {
  notOlustur,
  notlarGetir,
  notGetir,
  notSil,
  notGuncelle,
} = require("../controllers/notController");
const authKontrol = require('../middlewares/authKontrol')
const router = express.Router();
router.use(authKontrol)
router.get("/", notlarGetir);

// listele
router.get("/:id", notGetir);
// ekle
router.post("/", notOlustur);
// sil
router.delete("/:id", notSil);
// guncelle
router.patch("/:id", notGuncelle);

module.exports = router;
