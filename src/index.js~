"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/medicine', function (req, res) {
    res.send('Hello Medicine!');
});
app.get('/user', function (req, res) {
    res.send('Hello User!');
});
app.listen(process.env["PORT"] || 3000, function () {
    console.log('Example app listening on port 3000!');
});
