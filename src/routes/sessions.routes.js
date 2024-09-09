const { Router } = require("express")
//puxando do arquivo controler
const SessionController = require('../controller/SessionController')
//instanciando
const sessionsController = new SessionController()
const sessionRoutes = Router()
//acessar o metodo create da classe sessionsController
sessionRoutes.post("/", sessionsController.create)

module.exports = sessionRoutes
//agora importar no index