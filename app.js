require("dotenv").config();
require("./db");

const express = require("express");
const app = express();

require("./config")(app);
require('./config/session.config')(app)

const projectName = "DN";
app.locals.appTitle = `${(projectName)}`;

app.use((req, res, next) => {
    if (req.session.currentUser) {
        app.locals.userName = req.session.currentUser.username
        app.locals.id = req.session.currentUser._id
        // console.log(app.locals.userName, 'soy el usuario conectado')
    } else {
        app.locals.userName = null
        app.locals.id = null
    }
    next()
})

require('./routes')(app)
require("./error-handling")(app);
require("./error-handling")(app);

module.exports = app;
