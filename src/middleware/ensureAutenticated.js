//função disponivel dentro do json webtoken
const { verify } = require("jsonwebtoken")

//authconfig por exemplo ja usamos no sessionController, por isso é bom esses arquivos separados
const authConfig = require("../config/auth")
const AppError = require("../utils/AppError")

//o middleware sempre recebe o next, pra chaamr oa proxima função
function ensuredAutenticated(request, response, next) {
    //o token do usuario vai ta dentro da requisição no cabeçalho e dentro vai ter o token de autorização
    const authHeader = request.headers.authorization

    //se o token nao existe
    if (!authHeader) {
        throw new AppError("JWT token inválido", 401)
    }
    //o token vem assim no header "BARE XXXXX"
    //acessar o que ta dentro do header, pegandoa  string e separar por caracterer, vai quebrar o texto no espaço, na primeira posição o bare e na segunda posição o token
    //primeira posição bare e segundo o token
    const [, token] = authHeader.split(" ")

    //verificar se de fato é um token valido. funçaõ do webtoken
    //pega o token e o secret do jwt pra ver se é valido
    try {
        //o sub é o conteudo q ta la dentro, criando um alias
        //sub":"" é uma propriedade q consiguimos desestruturar do resultado da função, se é valido ele vai devolver esse sub ai
        //criando um apelido de user_id
        const {sub: user_id} = verify(token, authConfig.jwt.secret)
        //CRIANDO UMA PROPRIEDADE DENTRO DA REQUISIÇÃO Q NAO EXISTE AINDA
        
        request.user = {
            //E DENTRO DELA CRIANDO A PROPRIEDADE ID
            //na session controller a gente passou o user_id pra um texto
            id:Number(user_id)
        }
        //deu certo vai pra proxima

        return next()
    } catch (error) {
        throw new AppError("JWT inválido", 401)
    }
}

module.exports = ensuredAutenticated