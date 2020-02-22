import express = require('express');
import bodyParser = require('body-parser');

// Import todolistclass

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const port: string = process.env.PORT || '8080';


//The api calls here
app.get('/', ( req: any, res: any) =>{
    res.send("Hello Kadir");
})

app.listen(port, (err: Error) => {
    if(err){
        throw err;
    }
    console.log("App listening on post 8080!");
});

