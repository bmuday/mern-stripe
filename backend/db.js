const mongoose = require("mongoose");
require("dotenv").config();

const { username, password, database } = process.env;

mongoose
  .connect(
    `mongodb+srv://${username}:${password}@cluster0.nnbxv.mongodb.net/${database}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
