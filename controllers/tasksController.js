const { db } = require('../database')

// for POST
const createTask = (req, res) => {
    const { description, priority, progress, status } = req.body
    const query = `
        INSERT INTO tasks (description, priority, progress, status)
        VALUES (?, ?, ?, ?)
    `
    const params = [description, priority, progress, status]

    db.run(query, params, function(err) {
        if(err) {
            res.status(500).json({success:false,data:err.message})
        } else {
            res.status(200).json({success:true,data:{
                id: this.lastID,
                description: description,
                priority: priority,
                progress: progress, 
                status: status
            }})
        }
    })
}

// for GET (single) task
const getTask = (req, res) => {
    const { id } = req.params
    const query = `
        SELECT * FROM tasks
        WHERE id = ?
    `
    const params = [id]
    db.get(query, params, (err, row) => {
        if(err) {
            return res.status(500).json({success:false,data:err.message})
        }
        
        if(!row) {
            return res.status(404).json({success:false,data:"Task not found."})
        } else {
            res.status(200).json({success:true,data:row})
        }
        
    })
}

// for GET (all) tasks
const getAllTasks = (req, res) => {
    const query = `
        SELECT * FROM tasks
    `
    db.all(query, [], (err, rows) => {
        if(err) {
            return res.status(500).json({success:false,data:err.message})
        }

        res.status(200).json({success:false,data:rows})
    })
}

// for PUT
const updateTask = (req, res) => {
    const { id } = req.params
    const { description, priority, progress, status } = req.body
    const query = `
        UPDATE tasks
        SET
            description = COALESCE(?, description),
            priority = COALESCE(?, priority),
            progress = COALESCE(?, progress),
            status = COALESCE(?, status)
        WHERE id = ?
    `
    const params = [description, priority, progress, status, id]

    db.run(query, params, function(err) {
        if(err) {
            return res.status(500).json({success:false,data:err.message})
        }

        if(this.changes > 0) {
            return res.status(200).json({success:true,data:`Changes to this task no.${this.lastID}: ${this.changes}`})
        } else {
            return res.status(404).json({success:false,data:"Task not found."})
        }
    })
}

module.exports = { createTask, getTask, getAllTasks, updateTask }