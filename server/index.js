'use strict'

var express = require("express");
var app = express();
const cors = require('cors');
const connection = require('./dataBase/connection.js');
const router = require('./router.js');

app.use(cors());
app.use(express.json());
app.use(router);

//remove before deploy, just to check server working
app.get("/", function (req, res) {
  res.send("Hello World!");
});

async function startServer() {
  await connection();
  app.listen(3000, function () {
    console.log("Aplicación ejemplo, escuchando el puerto 3000!");
  })
};startServer();