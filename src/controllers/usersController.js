const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');

exports.CreateUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: "username, email and password are required" });
        }
        const userExists = await Users.findByUsername(username) // check for preventing account takeover
        if(userExists) {
            return res.status(400).json({error: "username already exists!"});
        }
        const user = await Users.create({ username, email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "username and password are required" });
        }
        const user = await Users.findByUsername(username);
        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        const isValid = await bcrypt.compare(`${password}${config.BYCRYPT_PEPPER}`, user.password);
        if (!isValid) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        const token = jwt.sign({ id: user.id, username: user.username }, config.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.GetProfile = async (req, res) => {
    try {
        const user = await Users.findByUsername(req.user.username);
        const { password, ...rest } = user;
        res.json(rest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        const { password, ...rest } = user;
        res.json(rest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}