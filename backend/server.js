const express = require("express");
require("dotenv").config();
const notRoute = require("./routes/notlar");
const kullaniciRoute = require("./routes/kullanici");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Veritabanina baglanildi");
    app.listen(process.env.PORT, () => {
      console.log(`${process.env.PORT}. port dinleniyor`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/notlar", notRoute);
app.use("/api/kullanici", kullaniciRoute);
