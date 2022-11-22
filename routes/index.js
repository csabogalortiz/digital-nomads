module.exports = app => {

    const indexRoutes = require("./index.routes");
    app.use("/", indexRoutes);

    // Places Routes 
    const placesRouter = require('./places.routes')
    app.use("/places", placesRouter)

    // // Map Routes - 
    const mapsRouter = require('./map.routes')
    app.use("/explore", mapsRouter)

    // API Routes 
    const apiRouter = require("./api.routes")
    app.use("/api", apiRouter)

    // Auth Routes
    const authRouter = require("./auth.routes");
    app.use("/auth", authRouter);

    //  Users Routes 
    const usersRouter = require("./users.routes")
    app.use("/user", usersRouter)
}


