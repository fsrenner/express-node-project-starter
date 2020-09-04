const config = require('../config/config');
const { response } = require('express');
const Logger = config.logger;

const login = async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    // Lookup User
    // Ensure passwords match
    // Set session id
    req.session.userId = Math.floor(Math.random() * Math.floor(100));
    // respond with User data
    return res.json({
        username,
        email
    });
};

const unauthorized = async (req, res) => {
    return res.status(401).json({
        message: 'You are not authorized to access this application'
    });
};

module.exports = {
    login,
    unauthorized
};