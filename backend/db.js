const mongoose = require("mongoose");

const { USERNAME, PASSWORD, DATABASE } = process.env;

mongoose
  .connect(
    `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.nnbxv.mongodb.net/${DATABASE}}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected..."))
  .catch(() => console.log("Connection to MongoDB failed..."));
