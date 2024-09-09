const { Router } = require("express")
const usersRoutes = require("./user.routes")
const notesRoutes = require("./notes.routes")
const tagsRoutes = require("./tags.routes")
//criando o session routes
const sessionRoutes = require("./sessions.routes")
const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/movieNotes", notesRoutes)
routes.use("/movieTags", tagsRoutes)
routes.use("/sessions", sessionRoutes )

module.exports = routes