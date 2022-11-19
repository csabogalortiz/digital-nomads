
require("dotenv").config();
require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();

require("./config")(app);

require('./config/session.config')(app)   // session setup

const capitalize = require("./utils/capitalize");
const projectName = "DN";

app.locals.appTitle = `${(projectName)}`;

// 👇 Start handling routes here

// Index/ Home
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);


// // Places Routes 
// const placesRouter = require('./routes/places.routes')
// app.use("/places", placesRouter)

// // Map Routes - no se 
// const mapsRouter = require('./routes/map.routes')
// app.use("/maps", mapsRouter)

// // API Routes 
// const apiRouter = require("./routes/api.routes")
// app.use("/api", apiRouter)

// Auth routes
const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);


// // Users Routes 
const usersRouter = require("./routes/users.routes")
app.use("/user", usersRouter)


require("./error-handling")(app);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
