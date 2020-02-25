import express = require('express');
import bodyParser = require('body-parser');
// Import todolistclass
import { Task, TaskHandler } from './task';
import { ok } from 'assert';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port: string = process.env.PORT || '8080';

const dbTaskHandler: TaskHandler = new TaskHandler();

//Get all Tasks [GET]
app.get('/', (req: any, res: any) => {
    let listOfTask = [] as any;
    console.log('1');
    dbTaskHandler.showTask((err: Error | null, result?: any) => {
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
app.put('editTask', (req: any, res: any) => {

})

//Delete task [DELETE]
app.delete('deleteTask', (req: any, res: any) => {

})



app.listen(port, (err: Error) => {
    if (err) {
        throw err;
    }
    console.log("App listening on post 8080!");
});

