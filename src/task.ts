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

export class TaskHandler {
    createTask(Task: Task): Task {
        return Task;
    }
    editTask(task: Task): Task {
        return task;
    }

    showTask(callback: (err: Error | null, result?: Task) => void) {
        // pool.query('SELECT * FROM tasks', (err: any, res: any) => {
        //     console.log(err, res);
        //     var tasks: any = res.rows
        //     console.log("********", tasks);
        //     return tasks;

        // })
        // pool.end()
        let tasks = [] as any;

        pool.connect((err: any, client: any, done: any) => {
            if (err) throw err
            client.query('SELECT * FROM tasks', (err: any, res: any) => {
              done()
              if (err) {
                console.log(err.stack)
              } else {
                console.log(res.rows)
                tasks = res.rows;
                return tasks;
              }
            })
          })
        //   console.log("tasks",tasks);
        //   return tasks;
    }

    deleteTask(Task: Task): Task {
        return Task;
    }
}
