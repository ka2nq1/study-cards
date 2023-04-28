const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');
const {secret} = require("../config");

const generateAccessToken = (id) => {
    const payload = {id};
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Registration error", errors});
            };
            const {username, password} = req.body;
            const candidate = await User.findOne({username});
            if (candidate) {
                return res.status(400).json({message: 'A user with that username already exists'});
            };
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({username, password: hashPassword});
            await user.save();
            return res.json({message: `The user ${username} has been successfully registered`});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Registration error'});
        }
    };

    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if (!user) {
                return res.status(400).json({message: `User ${username} not found`});
            };
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({message: `Incorrect password`});
            };
            const token = generateAccessToken(user._id);
            return res.json({token});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Login error'});
        }
    };

    async getUsers(req, res) {
        try {
            res.json("server is working");
        } catch (e) {

        }
    };
}

module.exports = new authController();