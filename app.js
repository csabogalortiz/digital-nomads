require("dotenv").config();
require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();

require("./config")(app);

require('./config/session.config')(app)   // session setup

const capitalize = require("./utils/capitalize");

// Global Variables
const projectName = "DN";

app.locals.appTitle = `${(projectName)}`;

require('./routes')(app)
require("./error-handling")(app);

module.exports = app;
