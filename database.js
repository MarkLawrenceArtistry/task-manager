const sqlite3 = require('sqlite3')
const DB_SOURCE = 'tasks.db'

const db = new sqlite3.Database(DB_SOURCE, (err) => {
    if(err) {
        console.log(err.message)
    }
})

const initDB = () => {
    db.serialize(() => {
        const priority = `
            CREATE TABLE IF NOT EXISTS priority (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL
            )
        `

        const status = `
            CREATE TABLE IF NOT EXISTS status (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL
            )
        `

        const tasks = `
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                description TEXT NOT NULL,
                priority TEXT NOT NULL,
                progress INT NOT NULL,
                status TEXT NOT NULL
            )
        `

        // priority
        db.run(priority, (err) => {
            if(err) {
                console.log("ERROR CREATING priority TABLE: " + err.message)
            } else {
                console.log("priority TABLE CREATED/ALREADY EXISTS.")
            }
        })

        // status
        db.run(status, (err) => {
            if(err) {
                console.log("ERROR CREATING status TABLE: " + err.message)
            } else {
                console.log("status TABLE CREATED/ALREADY EXISTS.")
            }
        })

        // priority
        db.run(tasks, (err) => {
            if(err) {
                console.log("ERROR CREATING tasks TABLE: " + err.message)
            } else {
                console.log("priority TABLE CREATED/ALREADY EXISTS.")
            }
        })
    })
}

module.exports = {db, initDB}