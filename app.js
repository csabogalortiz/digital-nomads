
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


// 👇 Start handling routes here

// Index/ Home
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);


// Places Routes 
const placesRouter = require('./routes/places.routes')
app.use("/places", placesRouter)

// // Map Routes - no se
const mapsRouter = require('./routes/map.routes')
app.use("/explore", mapsRouter)

// API Routes 
const apiRouter = require("./routes/api.routes")
app.use("/api", apiRouter)

// Auth Routes
const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);


//  Users Routes 
const usersRouter = require("./routes/users.routes")
app.use("/user", usersRouter)


require("./error-handling")(app);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
