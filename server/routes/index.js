const router = require("express").Router();
const apiRouter = require('./routes.api.js')


router.use("/api/v1", apiRouter)


module.exports = router;