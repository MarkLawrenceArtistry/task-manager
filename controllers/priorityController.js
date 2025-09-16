const { db } = require('../database')

// for POST
const createPriority = (req, res) => {
    const { name } = req.body
    
    const query = `
        INSERT INTO priority (name)
        VALUES (?)
    `
    const params = [name]

    db.run(query, params, function(err) {
        if(err) {
            res.status(500).json({success:false,data:err.message})
        } else {
            res.status(200).json({success:true,data:{
                id: this.lastID,
                name: name
            }})
        }
    })
}

// for GET (single) priority
const getPriority = (req, res) => {
    const { id } = req.params
    const query = `
        SELECT * FROM priority
        WHERE id = ?
    `
    const params = [id]
    db.get(query, params, (err, row) => {
        if(err) {
            return res.status(500).json({success:false,data:err.message})
        }
        
        if(!row) {
            return res.status(404).json({success:false,data:"Priority not found."})
        } else {
            res.status(200).json({success:true,data:row})
        }
        
    })
}

// for GET (all) priority
const getAllPriorities = (req, res) => {
    const query = `
        SELECT * FROM priority
    `
    db.all(query, [], (err, rows) => {
        if(err) {
            return res.status(500).json({success:false,data:err.message})
        }

        res.status(200).json({success:true,data:rows})
    })
}

// for PUT
const updatePriority = (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const query = `
        UPDATE priority
        SET
            name = COALESCE(?, name)
        WHERE id = ?
    `
    const params = [name, id]

    db.run(query, params, function(err) {
        if(err) {
            return res.status(500).json({success:false,data:err.message})
        }

        if(this.changes > 0) {
            return res.status(200).json({success:true,data:`Changes to this priority no.${this.lastID}: ${this.changes}`})
        } else {
            return res.status(404).json({success:false,data:"Priority not found."})
        }
    })
}

// for DELETE
const deletePriority = (req, res) => {
    const { id } = req.params
    const query = `DELETE FROM priority WHERE id = ?`
    const params = [id]

    db.run(query, params, function(err) {
        if(err) {
            return res.status(500).json({success:false,data:err.message})
        }

        if(this.changes > 0) {
            return res.status(200).json({success:true,data:`Priority successfully deleted! Changes: ${this.changes}`})
        } else {
            return res.status(404).json({success:false,data:"Priority not found."})
        }
    })
}

module.exports = { createPriority, getPriority, getAllPriorities, updatePriority,  deletePriority }