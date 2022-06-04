const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/test_4")
  .then((db) => console.log("db is connected"))
  .catch((e) => console.log(e));

module.exports = mongoose;
