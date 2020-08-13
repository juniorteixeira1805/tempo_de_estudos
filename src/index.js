//carregando modulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParse = require("body-parser")
const app = express()
const path = require("path") // configurar o css e js do bootstrap
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("connect-flash")
const passport = require('passport')
const funcdata = require("./controller/tempoController") 
//const https = require('https')
require("./config/auth")(passport)

// configurando o socket.io
const server = require('http').createServer(app)
const io = require('socket.io')(server)


// importando meus packs
    const Auth = require('./controller/authController')
    const AuthUser = require('./controller/userController')
    const Individual = require('./controller/salaIndividualController')
    const ResumoPost = require('./controller/resumoController')
    const ResumoGet = require('./router/resumo')
    const MetaPost = require('./controller/metasController')
    const MetaGet = require('./router/metas')
    const TurmaPost = require('./controller/turmaController')
    const TurmaGet = require('./router/turma')
    const ConfigPost = require('./controller/configControler')
    const ConfigGet = require('./router/config')
    const User = require('./router/user')
    const Administradores = require('./router/admin')
    const Tempo = require('./router/tempo')
    const Rank = require('./router/ranks')
    const Perfis = require('./router/perfis')

//configurações
    //sessão
        app.use(session({
            secret: "47e9979ca3bbb2baaec9b2c483b41bc8",
            resave: true,
            saveUninitialized: true
        }))
        app.use(passport.initialize())
        app.use(passport.session())

        app.use(flash())

    //midlware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("sucess_msg") //variavel global para mensagem de sucesso para ser exibida
            res.locals.error_msg = req.flash("error_msg") //variavel global para mensagem de erro para ser exibida
            res.locals.error = req.flash("error")
            res.locals.user = req.user || null;
            if ((req.headers["x-forwarded-proto"] || "").endsWith("http")) //Checa se o protocolo informado nos headers é HTTP
                res.redirect(`https://${req.hostname}${req.url}`); //Redireciona para HTTPS
            else //Se a requisição já é HTTPS
                next();
        })

    //body-parser
        app.use(bodyParse.urlencoded({extended: true}))
        app.use(bodyParse.json())

    //handlebars
        app.engine('handlebars', handlebars({defautLayout: 'main'})) //definido o LayoutPadrão main
        app.set('views', __dirname + '/views') // caminho da pasta views
        app.set('view engine', 'handlebars') //setandoo handlebars como o template

    //mongoose
        mongoose.Promise = global.Promise; // evita alguns tipos de erros
        mongoose.connect("mongodb+srv://devorion01:as123@cluster0-czhpf.mongodb.net/test?retryWrites=true&w=majority", { useFindAndModify: false }).then(() => { //cponectando ao banco de dados
            console.log("conectado ao mongo")
        }).catch((err) => {
            console.log("erro ao se conectar "+err)
        })

    //public
        app.use(express.static(path.join(__dirname,"public")))// definindo que os arquivos estaticos estão na pasta public

//Rotas
    app.use('/auth', Auth) // fixamos o prefixo "/admin" para o grupo de rotas admin
    app.use('/user', User)
    app.use('/authUser', AuthUser)
    app.use('/adm', Administradores)
    app.use('/salaIndividual', Individual)
    app.use('/tempo', Tempo)
    app.use('/resumo', ResumoGet)
    app.use('/resumoP', ResumoPost)
    app.use('/meta', MetaGet)
    app.use('/metaP', MetaPost)
    app.use('/rank', Rank)
    app.use('/turma', TurmaGet)
    app.use('/turmaP', TurmaPost)
    app.use('/config', ConfigGet)
    app.use('/configP', ConfigPost)
    app.use('/perfis', Perfis)
   //app.use('/Individual', GetIndividual)

    

//outros
    //--Funções chamadas para atualizar as horas do dia, semana e mes--//
    funcdata.verifcaData()

//--Rota para renderizar pagina de login--(Tem que ser retirada daqui)//
        app.get('/', (req, res) =>{
            res.render("./visitantes/pagInicial")
        });
        
    //conectando o servidor a porta 
        const PORT = process.env.PORT || 3000
        server.listen(PORT, () => {
            console.log("servidor rodando...")
        })