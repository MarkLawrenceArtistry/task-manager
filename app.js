const express = require('express')
const cors = require('cors')
const { db, initDB } = require('./database')

const PORT = 3000
const app = express()
const taskRoutes = require('./routes/tasks')
const priorityRoutes = require('./routes/priority')

// middlewares
app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.use('/api/tasks', taskRoutes)
app.use('/api/priority', priorityRoutes)

initDB()

app.listen(PORT, () => {
    console.log(`The port is listening at http://localhost:${PORT} ...`)
})

app.get('/', (req, res) => {
    res.status(200).json({success:true,data:"Welcome to task-manager app!"})
})