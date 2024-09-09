const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const { compare } = require("bcryptjs")
const authConfig = require("../config/auth")
const { sign } = require("jsonwebtoken")


class SessionController {
//como envolver conexao com o banco de dados
//criando uma sessao. Criando um token pro usuario
async create(request, response){
    const { email, password } = request.body

    const user = await knex("users").where({ email }).first()

    if (!user){
        throw new AppError("E-mail e ou senha inválidos", 401)
    }

    const passwordMatches = await compare(password, user.password)

    if(!passwordMatches){
        throw new AppError("E-mail e ou senha inválidos", 401)
    }

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({}, secret, {subject: String(user.id), expiresIn}) 

   
    return response.json({user, token})
}
}

module.exports = SessionController