const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const config = require('./appConfig');
const User = require('../models').User;
const Logger = config.logger;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({
      where: {
        id
      }
    });
    done(null, user);
});

passport.use('local', new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },
  async function(username, password, done) {
    Logger.info(`username = ${username}, password = ${password}`);
    let user;
    try {
      user = await User.findOne({
        where: {
          username
        }
      });
    } catch (e) {
      return done(e);
    }
    
    if (!user) {
      return done(null, false, { message: 'User was not found.' });
    }
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    Logger.info('LocalStrategy OK');
    return done(null, user);
  }
));

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/unauthorized');
    // .json({
    //   message: 'You are not allowed to access this restricted route without being authenticated.'
    // });
};

module.exports = {
    isAuthenticated
}