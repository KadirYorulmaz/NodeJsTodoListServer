"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
// Import todolistclass
var task_1 = require("./task");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var port = process.env.PORT || '8080';
var dbTaskHandler = new task_1.TaskHandler();
//The api calls here
app.get('/', function (req, res) {
    dbTaskHandler.showTask(function (err, result) {
        // if(err) res.send("Sorry no value come with http code")
        console.log(result);
        res.send(result);
    });
});
app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("App listening on post 8080!");
});
