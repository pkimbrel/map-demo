var express = require("express");
var bodyParser = require("body-parser");
var fs = require('fs');
var http = require('http');

var app = express();

app.use(express.static("public"));
app.use(express.static("node_modules"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

http.createServer(app).listen(9080, function () {
    console.log("App started on 9080.");
});