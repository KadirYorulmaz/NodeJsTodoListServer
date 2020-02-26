"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var task_1 = require("./task");
var assert_1 = require("assert");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var port = process.env.PORT || '8080';
var dbTaskHandler = new task_1.TaskHandler();
//Get all Tasks [GET]
app.get('/', function (req, res) {
    var listOfTask = [];
    console.log('1');
    dbTaskHandler.showTask(function (err, result) {
        if (err) {
            res.send("Sorry no value come with http code");
        }
        else {
            listOfTask = result;
            console.log("listOfTask", listOfTask);
            res.send(listOfTask);
        }
    });
});
//Get one task [GET]
app.get('/:id', function (req, res) {
});
//Create task [POST]
app.post('/createTask', function (req, res) {
    console.log(req.body);
    var task = new task_1.Task(req.body.title, req.body.description, req.body.createdDate, req.body.categoryId);
    console.log(task);
    dbTaskHandler.createTask(task, function (err, result) {
        if (err) {
            res.send("Sorry no value come with http code");
        }
        else {
            //print hello created OK
            res.send(assert_1.ok);
        }
    });
});
//Edit task [PUT]
app.put('/editTask', function (req, res) {
    console.log(req.body);
    console.log(req.body.tasksId);
    var taskId = req.body.tasksId;
    var task = new task_1.Task(req.body.title, req.body.description, req.body.createdDate, req.body.categoryId);
    console.log(taskId);
    console.log(task);
    dbTaskHandler.editTask(taskId, task, function (err, result) {
        if (err) {
            res.send("Sorry no value come with http code");
        }
        else {
            //print hello created OK
            res.send(assert_1.ok);
        }
    });
});
//Delete task [DELETE]
app.delete('/deleteTask/:id', function (req, res) {
    console.log(req.params.id);
    // console.log(req.body.tasksId);
    var taskId = req.params.id;
    // let task: Task = new Task(req.body.title, req.body.description, req.body.createdDate, req.body.categoryId);
    console.log(taskId);
    dbTaskHandler.deleteTask(taskId, function (err, result) {
        if (err) {
            res.send("Sorry no value come with http code");
        }
        else {
            //print hello created OK
            res.send(assert_1.ok);
        }
    });
});
var category_1 = require("./category");
var dbCategoryHandler = new category_1.CategoryHandler();
app.get('/cat', function (req, res) {
    console.log("Hello");
    res.send(assert_1.ok);
    // let category: Category = new Category(req.body.name);
    // dbCategoryHandler.showAllCategories((err: Error | null, result?: Category | undefined) =>{
    //     if (err) {
    //         res.send("Sorry no value come with http code")
    //     }else{
    //         //print hello created OK
    //         res.send(result);
    //     }
    // })
});
app.get('/addCategory', function (req, res) {
    console.log(req.body);
    var category = new category_1.Category(req.body.name);
    dbCategoryHandler.addCategory(category, function (err, result) {
        if (err) {
            res.send("Sorry no value come with http code");
        }
        else {
            //print hello created OK
            res.send(assert_1.ok);
        }
    });
});
app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("App listening on post 8080!");
});
