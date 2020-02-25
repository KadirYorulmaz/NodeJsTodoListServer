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
    TaskHandler.prototype.createTask = function (Task) {
        return Task;
    };
    TaskHandler.prototype.editTask = function (task) {
        return task;
    };
    TaskHandler.prototype.showTask = function (callback) {
        // pool.query('SELECT * FROM tasks', (err: any, res: any) => {
        //     console.log(err, res);
        //     var tasks: any = res.rows
        //     console.log("********", tasks);
        //     return tasks;
        // })
        // pool.end()
        var tasks = [];
        pool.connect(function (err, client, done) {
            if (err)
                throw err;
            client.query('SELECT * FROM tasks', function (err, res) {
                done();
                if (err) {
                    console.log(err.stack);
                }
                else {
                    console.log(res.rows);
                    tasks = res.rows;
                }
            });
        });
        return tasks;
    };
    TaskHandler.prototype.deleteTask = function (Task) {
        return Task;
    };
    return TaskHandler;
}());
exports.TaskHandler = TaskHandler;
