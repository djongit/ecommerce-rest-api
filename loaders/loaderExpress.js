const session = require('express-session');
const { SESSION_SECRET } = require('../conf');
const bodyParser = require('body-parser');
const cors = require('cors');



module.exports = (app) => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(
        session({
            secret: SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 *60, 
                secure: true,
                sameSite: 'none',
                httpOnly: true
            }
        })
    )
    return app;
}