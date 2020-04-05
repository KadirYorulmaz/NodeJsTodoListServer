import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');

import { Task, TaskHandler } from './task';

import { ok } from 'assert';

const app = express();

app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port: string = process.env.PORT || '8080';

const dbTaskHandler: TaskHandler = new TaskHandler();

//Get all Tasks [GET]
app.get('/', (req: any, res: any) => {
    let listOfTask = [] as any; 
    console.log('1'); 
    dbTaskHandler.showTasks((err: Error | null, result?: any) => {
        if (err) {
            res.send("Sorry no value come with http code")
        }
        else {
            listOfTask = result;
            console.log("listOfTask", listOfTask);
            res.send(listOfTask);
        }
    })
})

//Get one task [GET]
app.get('/:id', (req: any, res: any) => {
    console.log(req.params.id);
    const taskId: number = req.params.id
    dbTaskHandler.showOneTask(taskId, (err: Error| null, result?: any) => {
        if (err) {
            res.send("Sorry no value come with http code")
        }else{
            res.send(result);
        }
    })
})

//Create task [POST]
app.post('/createTask', (req: any, res: any) => {
    console.log(req.body);
    let task: Task = new Task(req.body.title, req.body.description, req.body.createdDate, req.body.categoryId);
    console.log(task);
   
    dbTaskHandler.createTask(task, (err: Error| null, result?: any) => {
        if (err) {
            res.send("Sorry no value come with http code")
        }else{
            //print hello created OK
            res.send(ok);
        }
    })
})

//Edit task [PUT]
app.put('/editTask', (req: any, res: any) => {
    console.log(req.body);
    console.log(req.body.tasksId);
    let taskId = req.body.tasksId;
    let task: Task = new Task(req.body.title, req.body.description, req.body.createdDate, req.body.categoryId);
    console.log(taskId);
    console.log(task);
    dbTaskHandler.editTask(taskId ,task, (err: Error| null, result?: any) => {
        if (err) {
            res.send("Sorry no value come with http code")
        }else{
            //print hello created OK
            res.send(ok);
        }
    })
})

//Delete task [DELETE]
app.delete('/deleteTask/:id', (req: any, res: any) => {
    console.log(req.params.id);
    // console.log(req.body.tasksId);
    let taskId = req.params.id;
    // let task: Task = new Task(req.body.title, req.body.description, req.body.createdDate, req.body.categoryId);
    console.log(taskId);
    dbTaskHandler.deleteTask(taskId, (err: Error| null, result?: any) => {
        if (err) {
            res.send("Sorry no value come with http code")
        }else{
            //print hello created OK
            res.send(ok);
        }
    })
})





import { Category, CategoryHandler } from './category'
const dbCategoryHandler: CategoryHandler = new CategoryHandler();

const categoryRouter = express.Router();
app.use('/categories', categoryRouter);

categoryRouter.get('/showCategories', (req: any, res: any) => {
    console.log("Hello");
    let category: Category = new Category(req.body.name);
    dbCategoryHandler.showAllCategories((err: Error | null, result?: Category | undefined) => {
        if (err) {
            res.send("Sorry no value come with http code")
        }else{
            //print hello created OK
            res.send(result);
        }
    })
})

categoryRouter.post('/addCategory', (req: any, res: any) => {
    console.log(req.body);
    let category: Category = new Category(req.body.name);
    dbCategoryHandler.addCategory(category, (err: Error | null, result?: Category | undefined) => {
        if (err) {
            res.send("Sorry no value come with http code")
        }else{
            //print hello created OK
            res.send(ok);
        }
    })
})

categoryRouter.put('/editCategory/:id', (req: any, res: any) => {
    console.log(req.params.id);
    console.log(req.body);
    const categoryId = req.params.id;
    let category: Category = new Category(req.body.name);
    dbCategoryHandler.editCategory(categoryId, category, (err: Error | null, result?: Category | undefined) => {
        if (err) {
            res.send("Sorry no value come with http code")
        }else{
            //print hello created OK
            res.send(ok);
        }
    })
})

categoryRouter.delete('/deleteCategory/:id', (req: any, res: any) => {
    console.log(req.params.id);
    const categoryId = req.params.id;
    dbCategoryHandler.deleteCategory(categoryId, (err: Error | null, result?: Category | undefined) => {
        if (err) {
            res.send("Sorry no value come with http code")
        }else{
            //print hello created OK
            res.send(ok);
        }
    })
})

app.listen(port, (err: Error) => {
    if (err) {
        throw err;
    }
    console.log("App listening on post 8080!");
});

