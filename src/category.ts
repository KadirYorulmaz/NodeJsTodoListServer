const { Pool, Client } = require('pg');
const connectionString = 'postgresql://postgres:password@localhost:5432/TodoListDB'

const pool = new Pool({
    connectionString: connectionString,
})

pool.on('error', (err: any, client: any) => {
    console.error('Unexpected error on idle client', err) // your callback here
    process.exit(-1)
})

export class Category{
    name: string; 

    constructor(name: string){
        this.name = name; 
    }

}

export class CategoryHandler{

    showAllCategories(callback: (err: Error | null, result?: Category) => void){
        const sqlStatement: string = 'SELECT * FROM categories';

        let categories = [] as any;

        pool.connect((err: any, client: any, done: any) => {
            if (err) throw err
            client.query(sqlStatement, (err: any, res: any) => {
              done()
              if (err) {
                console.log(err.stack)
                callback(err, res);
              } else {
                  console.log(res);
                  categories = res.rows;
                callback(err, categories);
              }
            })
          })
    }

    addCategory(category: Category, callback: (err: Error | null, result?: Category) => void){
        const sqlStatement: string = 'INSERT INTO categories (category_name) VALUES ($1)';
        const sqlvalues = [category.name]
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

    editCategory(categoryId: number, category: Category, callback: (err: Error | null, result?: Category) => void){
        const sqlStatement: string = 'UPDATE categories SET category_name=($1)';
        const sqlvalues = [category.name]
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

    deleteCategory(categoryId: number, callback: (err: Error | null, result?: Category) => void){
        const sqlStatement: string = 'DELETE FROM categories WHERE category_id=($1)';
        
        pool.connect((err: any, client: any, done: any) => {
            if (err) throw err
            client.query(sqlStatement, categoryId, (err: any, res: any) => {
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