const { db } = require('../database')

// for POST
const createStatus = (req, res) => {
    const { name } = req.body
    
    const query = `
        INSERT INTO status (name)
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

// for GET (all) priority
const getAllStatus = (req, res) => {
    const query = `
        SELECT * FROM status
    `
    db.all(query, [], (err, rows) => {
        if(err) {
            return res.status(500).json({success:false,data:err.message})
        }

        res.status(200).json({success:true,data:rows})
    })
}

// for PUT
const updateStatus = (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const query = `
        UPDATE status
        SET
            name = COALESCE(?, name),
        WHERE id = ?
    `
    const params = [name, id]

    db.run(query, params, function(err) {
        if(err) {
            return res.status(500).json({success:false,data:err.message})
        }

        if(this.changes > 0) {
            return res.status(200).json({success:true,data:`Changes to this status no.${this.lastID}: ${this.changes}`})
        } else {
            return res.status(404).json({success:false,data:"Status not found."})
        }
    })
}

// for DELETE
const deleteStatus = (req, res) => {
    const { id } = req.params
    const query = `DELETE FROM status WHERE id = ?`
    const params = [id]

    db.run(query, params, function(err) {
        if(err) {
            return res.status(500).json({success:false,data:err.message})
        }

        if(this.changes > 0) {
            return res.status(200).json({success:true,data:`Status successfully deleted! Changes: ${this.changes}`})
        } else {
            return res.status(404).json({success:false,data:"Status not found."})
        }
    })
}

module.exports = { createStatus, getAllStatus, updateStatus,  deleteStatus }