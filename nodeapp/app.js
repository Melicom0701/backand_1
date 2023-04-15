const express = require("express");
const connection = require('../nodeapp/routes/db.js');
require('dotenv').config()
const app = express();
const port = 8080;






app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const userRoute = require("./routes/user");
app.use("/user", userRoute);
app.get("/", function (req, res) {
  res.send("<h2>Konnchiwa</h2>");
});


app.listen(port, function () {
  console.log("Your app running on port " + port);
});
