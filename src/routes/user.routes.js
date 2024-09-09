const { Router } = require("express")

const multer = require("multer")
const uploadConfig = require("../config/upload")

const UsersController = require('../controller/UsersController')
const ensureAutenticated = require("../middleware/ensureAutenticated")
const usersRoutes = Router()

const upload = multer(uploadConfig.MULTER)

const usersController = new UsersController()

usersRoutes.post('/', usersController.create)
usersRoutes.put('/', ensureAutenticated, usersController.update)
usersRoutes.patch('/avatr', ensureAutenticated, usersController.update)

module.exports = usersRoutes