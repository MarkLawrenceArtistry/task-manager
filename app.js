const express = require('express')
const cors = require('cors')
const { db, initDB } = require('./database')

const PORT = 3000
const app = express()

// middlewares
app.use(express.json())
app.use(cors())

initDB()

app.listen(PORT, () => {
    console.log(`The port is listening at http://localhost:${PORT} ...`)
})


app.get('/', (req, res) => {
    res.status(200).json({success:true,data:"Welcome to task-manager app!"})
})