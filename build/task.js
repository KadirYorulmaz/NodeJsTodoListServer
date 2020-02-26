"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('pg'), Pool = _a.Pool, Client = _a.Client;
var connectionString = 'postgresql://postgres:password@localhost:5432/TodoListDB';
var pool = new Pool({
    connectionString: connectionString,
});
pool.on('error', function (err, client) {
    console.error('Unexpected error on idle client', err); // your callback here
    process.exit(-1);
});
var Task = /** @class */ (function () {
    function Task(title, description, createdDate, categoryId) {
        this.title = title;
        this.description = description;
        this.createdDate = createdDate;
        this.categoryId = categoryId;
    }
    return Task;
}());
exports.Task = Task;
var TaskHandler = /** @class */ (function () {
    function TaskHandler() {
    }
    TaskHandler.prototype.createTask = function (task, callback) {
        var sqlStatement = 'INSERT INTO tasks(task_title, task_description, task_date, category_id) VALUES ($1, $2, $3, $4)';
        var sqlvalues = [task.title, task.description, task.createdDate, task.categoryId];
        pool.connect(function (err, client, done) {
            if (err)
                throw err;
            client.query(sqlStatement, sqlvalues, function (err, res) {
                done();
                if (err) {
                    console.log(err.stack);
                    callback(err, res);
                }
                else {
                    console.log(res);
                    callback(err, res);
                }
            });
        });
    };
    TaskHandler.prototype.editTask = function (taskId, task, callback) {
        var sqlStatement = 'UPDATE tasks SET task_title=($1), task_description=($2), task_date=($3), category_id=($4) WHERE task_id=($5)';
        var sqlvalues = [task.title, task.description, task.createdDate, task.categoryId, taskId];
        pool.connect(function (err, client, done) {
            if (err)
                throw err;
            client.query(sqlStatement, sqlvalues, function (err, res) {
                done();
                if (err) {
                    console.log(err.stack);
                    callback(err, res);
                }
                else {
                    console.log(res);
                    callback(err, res);
                }
            });
        });
    };
    TaskHandler.prototype.showTask = function (callback) {
        var tasks = [];
        var sqlStatement = 'SELECT * FROM tasks';
        pool.connect(function (err, client, done) {
            if (err)
                throw err;
            client.query(sqlStatement, function (err, res) {
                done();
                if (err) {
                    console.log(err.stack);
                    callback(err, tasks);
                }
                else {
                    tasks = res.rows;
                    console.log(tasks);
                    callback(err, tasks);
                }
            });
        });
    };
    TaskHandler.prototype.deleteTask = function (taskId, callback) {
        var sqlStatement = 'DELETE FROM tasks WHERE task_id=($1)';
        var sqlvalues = [taskId];
        pool.connect(function (err, client, done) {
            if (err)
                throw err;
            client.query(sqlStatement, sqlvalues, function (err, res) {
                done();
                if (err) {
                    console.log(err.stack);
                    callback(err, res);
                }
                else {
                    console.log(res);
                    callback(err, res);
                }
            });
        });
    };
    return TaskHandler;
}());
exports.TaskHandler = TaskHandler;
