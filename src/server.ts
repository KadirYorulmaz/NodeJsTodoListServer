import express = require('express');
import bodyParser = require('body-parser');
// Import todolistclass
import { Task, TaskHandler} from './task';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const port: string = process.env.PORT || '8080';

const dbTaskHandler: TaskHandler = new TaskHandler();

//The api calls here
app.get('/', ( req: any, res: any) => {
    let listOfTask = [] as any;
    dbTaskHandler.showTask((err: Error | null, result?: any) => {
        // if(err) res.send("Sorry no value come with http code")
        console.log("HALOU");
        console.log(result);
        listOfTask = result;
        console.log("listOfTask", listOfTask);
    })  
   
    // res.send(listOfTask);
})

app.listen(port, (err: Error) => {
    if(err){
        throw err;
    }
    console.log("App listening on post 8080!");
});

