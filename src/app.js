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
const Func = require("./config/nodemailer")
require("./config/auth")(passport)

// importando meus packs
    const Auth = require('./controller/authController')
    const AuthUser = require('./controller/userController')
    const User = require('./router/user')

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
            next()
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
        mongoose.connect("mongodb+srv://devorion01:as123@cluster0-czhpf.mongodb.net/test?retryWrites=true&w=majority").then(() => { //cponectando ao banco de dados
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

//outros
    //escutando tempo para enviar email
    setInterval(function(){
        var email = ["juniorteixeira1805@gmail.com","klaria6@gmail.com","kassia.milenateixeira@gmail.com","carolsilva58022@gmail.com","lidineide_nunes@hotmail.com","dayannetargino74@gmail.com","janeirode97@gmail.com","sayoolima@gmail.com","diegooliveira.msi@gmail.com","aliicecs@ufrn.edu.br","leticiacruz606@gmail.com","herlanecandido_@hotmail.com","vitor3souza@gmail.com","loiolamateus7@gmail.com","helloysaregiane@gmail.com","anaa.lusantos@gmail.com","adelsonunes.ribeiro@hotmail.com","marcosadriano740@gmail.com"]        var data = new Date()
        console.log("Verificando hora de mandar email: " + data.getHours())
        if(data.getHours() == "16"){
        Func.enviarEmail(email, email.length)
        } }, 3600000);
        // 3600000 uma hora

    //conectando o servidor a porta
        const PORT = process.env.PORT || 3000
        app.listen(PORT, () => {
            console.log("servidor rodando...")
        })