'use strict'

var express = require("express");
var app = express();
const cors = require('cors');
const connection = require('./dataBase/connection.js');
const router = require('./router.js');

const hostname = "127.0.0.1";
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(router);

//remove before deploy, just to check server working
app.get("/", function (req, res) {
  res.send("Hello World!");
});

async function startServer() {
  await connection();
  app.listen(port, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
  })
}; startServer();