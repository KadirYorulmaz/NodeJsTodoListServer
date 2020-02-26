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
var Category = /** @class */ (function () {
    function Category(name) {
        this.name = name;
    }
    return Category;
}());
exports.Category = Category;
var CategoryHandler = /** @class */ (function () {
    function CategoryHandler() {
    }
    CategoryHandler.prototype.showAllCategories = function (callback) {
        var sqlStatement = 'SELECT * FROM categories';
        var categories = [];
        pool.connect(function (err, client, done) {
            if (err)
                throw err;
            client.query(sqlStatement, function (err, res) {
                done();
                if (err) {
                    console.log(err.stack);
                    callback(err, res);
                }
                else {
                    console.log(res);
                    categories = res.rows;
                    callback(err, categories);
                }
            });
        });
    };
    CategoryHandler.prototype.addCategory = function (category, callback) {
        var sqlStatement = 'INSERT INTO categories(category_name) VALUES ($1)';
        var sqlvalues = [category.name];
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
    CategoryHandler.prototype.editCategory = function (categoryId, category, callback) {
        var sqlStatement = 'UPDATE categories SET category_name=($1)';
        var sqlvalues = [category.name];
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
    CategoryHandler.prototype.deleteCategory = function () {
    };
    return CategoryHandler;
}());
exports.CategoryHandler = CategoryHandler;
