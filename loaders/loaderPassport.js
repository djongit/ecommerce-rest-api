const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;



const serviceAuth = require('../services/serviceAuth');
const serviceAuthRequest = new serviceAuth();

module.exports = async (app) => {

    app.use(passport.initialize());
    app.use(passport.session()); // middleware for persistent logins

    // set id as cookie in user browser
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        done(null, {id});
    });

    passport.use(new LocalStrategy(
        async (email, password, done) =>{
            try{
                const findUser = await serviceAuthRequest.login({email: email, password});
                return done(null, findUser);
            } catch(error) {
                return done(error);
            }
        }
    ))
    return passport;
};


