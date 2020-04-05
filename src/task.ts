const { Pool, Client } = require('pg');
const connectionString = 'postgresql://postgres:password@localhost:5432/TodoListDB'

const pool = new Pool({
    connectionString: connectionString,
})

pool.on('error', (err: any, client: any) => {
    console.error('Unexpected error on idle client', err) // your callback here
    process.exit(-1)
})

export class Task {
    title: string;
    description: string;
    createdDate: Date;
    categoryId: number;

    constructor(title: string, description: string, createdDate: Date, categoryId: number) {
        this.title = title;
        this.description = description;
        this.createdDate = createdDate;
        this.categoryId = categoryId;
    }
}

//createTask
//editTask
//showOneTask
//showTask
//deleteTask


export class TaskHandler {
    createTask(task: Task, callback: (err: Error | null, result?: Task) => void) {
        const sqlStatement: string = 'INSERT INTO tasks(task_title, task_description, task_date, category_id) VALUES ($1, $2, $3, $4)';
        const sqlvalues = [task.title, task.description, task.createdDate, task.categoryId]
        pool.connect((err: any, client: any, done: any) => {
            if (err) throw err
            client.query(sqlStatement, sqlvalues, (err: any, res: any) => {
                done()
                if (err) {
                    console.log(err.stack)
                    callback(err, res);
                } else {
                    console.log(res);
                    callback(err, res);
                }
            })
        })
    }

    editTask(taskId: number, task: Task, callback: (err: Error | null, result?: Task) => void) {
        const sqlStatement: string = 'UPDATE tasks SET task_title=($1), task_description=($2), task_date=($3), category_id=($4) WHERE task_id=($5)'
        const sqlvalues = [task.title, task.description, task.createdDate, task.categoryId, taskId]
        pool.connect((err: any, client: any, done: any) => {
            if (err) throw err
            client.query(sqlStatement, sqlvalues, (err: any, res: any) => {
                done()
                if (err) {
                    console.log(err.stack)
                    callback(err, res);
                } else {
                    console.log(res);
                    callback(err, res);
                }
            })
        })
    }

    showOneTask(taskId: number, callback: (err: Error | null, result?: Task) => void) {
        let sqlStatement: string = 'SELECT * FROM tasks, categories WHERE tasks.category_id = categories.category_id AND task_id = ($1)';
        const sqlValues = [taskId]
        pool.connect((err: any, client: any, done: any) => {
            if (err) throw err
            client.query(sqlStatement, sqlValues, (err: any, res: any) => {
                done()
                if (err) {
                    console.log(err.stack)
                    callback(err, res);
                } else {
                    callback(err, res.rows);
                }
            })
        })
    }

    showTasks(callback: (err: Error | null, result?: Task) => void) {
        let tasks = [] as any;
        let sqlStatement: string = 'SELECT * FROM tasks, categories WHERE tasks.category_id = categories.category_id';
        pool.connect((err: any, client: any, done: any) => {
            if (err) throw err
            client.query(sqlStatement, (err: any, res: any) => {
                done()
                if (err) {
                    console.log(err.stack)
                    callback(err, tasks);
                } else {

                    tasks = res.rows;
                    console.log(tasks)
                    callback(err, tasks);
                }
            })
        })
    }

    deleteTask(taskId: number, callback: (err: Error | null, result?: Task) => void) {
        const sqlStatement: string = 'DELETE FROM tasks WHERE task_id=($1)';
        const sqlvalues = [taskId]
        pool.connect((err: any, client: any, done: any) => {
            if (err) throw err
            client.query(sqlStatement, sqlvalues, (err: any, res: any) => {
                done()
                if (err) {
                    console.log(err.stack)
                    callback(err, res);
                } else {
                    console.log(res);
                    callback(err, res);
                }
            })
        })
    }
}
