const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Sema = mongoose.Schema;

const kullaniciSema = new Sema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  parola: {
    type: String,
    required: true,
  },
});

kullaniciSema.statics.signup = async function (email, parola) {
  if (!email || !parola) {
    throw Error("Alanlar bos gecilemez");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email kurallara uygun deyil.");
  }
  if (!validator.isStrongPassword(parola)) {
    throw Error("Parola yeterince guclu deyil.");
  }

  const kontrolKullanici = await this.findOne({ email });

  if (kontrolKullanici) {
    throw Error("Email zaten kullaniliyor");
  }

  const salt = await bcrypt.genSalt(10);
  const sifrelenmisParola = await bcrypt.hash(parola, salt);
  const kullanici = await this.create({
    email,
    parola: sifrelenmisParola,
  });
  return kullanici;
};

kullaniciSema.statics.login = async function (email,parola){
    if(!email || !parola){
        throw Error("Alanlar bos gecilemez.")
    }
    const kullanici = await this.findOne({email})
    if(!kullanici){
        throw Error("Email bulunamadi")
    }
    const parolaKontrol = await bcrypt.compare(parola,kullanici.parola)
    if(!parolaKontrol){
        throw Error("Hatali parola girdiniz")
    }
    return kullanici
}

module.exports = mongoose.model("Kullanici", kullaniciSema);
