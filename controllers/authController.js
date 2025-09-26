const { db } = require('../database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = (req, res) => {
    const { username, password } = req.body

    if(!username || !password) {
        return res.status(400).json({success:false,data:"Username and password are required."})
    }

    // hashing
    // (password, salt value)
    bcrypt.hash(password, 10, (err, hash) => {
        if(err) {
            return res.status(500).json({success:false,data:"Error: Hashing password failed."})
        }

        const query = `
            INSERT INTO users (username, password_hash)
            VALUES (?, ?)
        `
        const params = [username, hash]

        db.run(query, params, function(err) {
            if(err) {
                return res.status(500).json({success:false,data:err.message})
            }

            res.status(201).json({success:true,data:`USER ID:${this.lastID} CREATE SUCCESSFULLY`})
        })
    })
}

const login = (req, res) => {
    const { username, password } = req.body

    if(!username || !password) {
        return res.status(400).json({success:false,data:"Username and password are required."})
    }

    const query = `SELECT * FROM users WHERE username = ?`
    const params = [username]

    db.get(query, params, (err, user) => {
        if(err) {
            return res.status(500).json({success:false,data:err.message})
        }

        if(!user) {
            return res.status(401).json({success:false,data:"Invalid username or password."})
        }

        bcrypt.compare(password, user.password_hash, (err, result) => {
            if(err) {
                return res.status(500).json({success:false,data:"Error: Comparing passwords failed."})
            }

            if(result) {
                const payload = { id: user.id, username: user.username }
                const secret = process.env.JWT_SECRET
                const options = { expiresIn: '1hr' }

                console.log('The secret being used is:', secret);
                const token = jwt.sign(payload, secret, options)

                return res.status(200).json({success:true,data:"LOGIN SUCCESSFUL.",token:token})
            } else {
                return res.status(401).json({success:false,data:"Invalid username or password."})
            }
        })
    })
}

module.exports = { register, login }