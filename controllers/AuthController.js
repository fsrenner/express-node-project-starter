const { formatRelativeWithOptions } = require('date-fns/fp');
const config = require('../config/appConfig');
const User = require('../models').User;
const Logger = config.logger;

module.exports = {
    login: async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const user = await User.findOne({
            where: {
              username,
              password
            }
        });
        if (!user) {
            return res.status(404).json({
                message: `User: ${username} was not found`
            });
        }
        req.session.userId = user.id;
        // respond with User data
        return res.json({
            user
        });
    },
    unauthorized: async (req, res) => {
        return res.status(401).json({
            message: 'You are not authorized to access this application'
        });
    },
    logout: async (req, res) => {
        req.logout();
        res.send({
            message: 'You have successfully logged out of the application'
        })
    }
};
