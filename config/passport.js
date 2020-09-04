const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const config = require('./config')
const Logger = config.logger;

passport.use('local', new LocalStrategy(
    function(username, password, done) {
      Logger.info('username, password', username, password);
      if (username !== 'admin') {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (password !== 'passwd') {
        return done(null, false, { message: 'Incorrect password.' });
      }
      Logger.info('LocalStrategy OK');
      return done(null, {
        username: 'admin'
      });
    }
));
  
passport.use('facebook', new FacebookStrategy(
    config.passport.facebook,
    function(accessToken, refreshToken, profile, done) {
      Logger.info('Facebook Profile: ', profile);
      // in real life: create or update user...
      return done(null, {username: profile.id});
    }
));

passport.use('google', new GoogleStrategy(
    config.passport.google,
    function(token, tokenSecret, profile, done) {
      Logger.info('Google Profile: ', profile);
      // in real life: create or update user...
      return done(null, {username: profile.id});
    }
));

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login')
};

module.exports = {
    isAuthenticated
}