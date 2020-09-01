//--Importando os modulos--//
    const express = require('express');
    const multer = require("multer");
    const path = require("path");
    const User = require('../models/User');
    const Atividade = require('../models/Atividade');
    const SalaIndividual = require('../models/salaIndividual');
    const Resumos = require('../models/Resumo');
    const Metas = require('../models/Meta');
    const Coletiva = require('../models/salaColetiva');

    const router = express.Router();

    const passport = require('passport')

    const Email = require("../config/nodemailer")


    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, path.join(__dirname, '../public/uploads/'));
            //cb(null, "./public/uploads/")
        },

        filename: function(req, file, cb) {
            var caminho = file.originalname + Date.now() + path.extname(file.originalname)
            cb(null, caminho)
            var desti = "/uploads/" + caminho
            User.updateOne({_id: req.user._id}, {foto: desti}).then((req, res) => {}).catch((err) => {})
        }
    })

    const upload = multer({storage})

    router.post("/addFoto", upload.single("foto"), async(req, res) => {
        res.redirect("/perfis/meuperfil")
    })

//-- Rota para registrar Novo Usuario--//
    router.post('/registerUser', async (req, res) => {
    //--Criando novo usuario--//
        try{
            const user = await User.create(req.body);
            //-- enviando e-mail de boas bvindas --//
            Email.sendInfo(req.body.email, "Olá, estamos muito felizes que está no nosso time. Seja bem vindo! Lutaremos juntos para conquistar seu objeivo.")

            //-- Esta função é responsavel por gerar um código aleatorio que é o código de validação--//
            function makeid() {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for (var i = 0; i < 5; i++)
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                return text;
                }
            var hash = makeid()

            //Atualizando o banco de dados
            await User.updateOne({email: req.body.email}, {codResete: hash}).then(() =>{
                console.log("Código de validação salvo no banco de dados")
            }).catch((err) => {
                console.log("erro ao salvar codigo de validação: " + err)
            })
            //-- enviando código de validação --//
            await Email.SendCode(req.body.email, hash)

            user.password = undefined; //-- para o que password não retorne no Json--//

            console.log("Novo Usuario cadastrado")
            req.flash("sucess_msg", "Você foi cadastrado, para utilizar a plataforma, você deve validar seu e-mail. Faça o login e informe o código que enviamos para seu e-mail.")
            res.redirect("/")

        } catch(err) {
            req.flash("error_msg", "Erro ao cadastrar! Tente outro E-mail.")
            res.redirect("/")
            console.log("Deu erro ao tentar cadastrar um novo usuario: ", err)
        }
    });

//-- Rota que é chamanda quando o botão de reenviar codigo de validação é selecionado --//
    router.post('/reenvia', async(req, res) =>{
        try{
         //-- Esta função é responsavel por gerar um código aleatorio que é o código de validação--//
            function makeid() {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for (var i = 0; i < 5; i++)
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                return text;
                }
            var hash = makeid()
            
            //-- Atualizando o banco de dados --//
            await User.updateOne({email: req.body.email}, {codResete: hash}).then(() =>{
                console.log("Salvo novo codígo de validação")
            }).catch((err) => {
                console.log("erro ao salvar novo código de validação codigo:" + err)
            })

            //-- Enviando novo e-mail com novo código de validação --//
            await Email.SendCode(req.body.email, hash)
            console.log(req.user.name + " reenviou o código de validação ao email")
            req.flash("sucess_msg", req.user.name+ ", seu código foi reenviado!")
            res.redirect("/user/home")

        }catch(err){
            req.flash("error_msg", "Erro ao reenviar o novo código de validação.")
            res.redirect("/user/home")
            console.log("erro reenviar email:" + err)
        }
    })

//--Rota que é chamada para a validação do email --//
    router.post('/validaEmail', async (req, res) => {
    //-- verifica se o código que vem do corpo é igual ao código no Banco de dados --//
        if(req.body.codigo == req.user.codResete){
        //-- atualiza o campo validaEmail para true --//
            await User.updateOne({_id: req.user._id}, {validaEmail: true}).then(() =>{
                console.log(req.user.name + " validou a email")
                req.flash("sucess_msg", req.user.name+ ", seu email foi  validado!")
                res.redirect("/user/home")
            }).catch((err) => {
                req.flash("error_msg", "Erro ao validar! Tente novamente.")
                res.redirect("/user/home")
                console.log("erro validar e-mail:" + err)
            })
        }else{
            req.flash("error_msg", "Código incorreto!.")
            res.redirect("/user/home")
            console.log("erro validar e-mail:" + err)
        }
    })
    

    

//--Rota para deletar usuarios do banco de dados--//
    router.post('/deletarUser', (req, res) =>{
        //-- Deletando os dados do usuario --//
        try{
        //--Deletando do banco as atividades do usuario que será deletado--//
            Atividade.deleteMany({ estudante: req.body.id }, function (err) { //procurando todas as collections que tem o id que vem do body (usuario) como estudante
                console.log(req.user.name + " deletou as atividades")
            })

        //--Deletando do banco as atividades do usuario que será deletado--//
        Resumos.deleteMany({ estudante: req.body.id }, function (err) { //procurando todas as collections que tem o id que vem do body (usuario) como estudante
            console.log(req.user.name + " deletou as Resumos")
        })

        //--Deletando do banco as atividades do usuario que será deletado--//
        Metas.deleteMany({ estudante: req.body.id }, function (err) { //procurando todas as collections que tem o id que vem do body (usuario) como estudante
            console.log(req.user.name + " deletou as Metas")
        })

        //--Deletando do banco a sala individual do usuario que será deletado--//
            SalaIndividual.deleteOne({ responsavel: req.body.id }, function (err) { //procurando todas as collections que tem o id que vem do body (usuario) como estudante
                console.log(req.user.name + " deletou as sua sala individual")
            })

            Coletiva.findOneAndUpdate({ responsavel: req.user._id },{ $pull: { participantes: { participante: req.user._id } } })

        //--Deletando usuario do banco de dados--//
            User.deleteOne({_id: req.body.id}).then(() => { //--Procurando a collection que tem o id que vem do body (usuario)--//
                console.log(req.user.name + " deletou sua conta")
                req.flash("success_msg", "Conta deletada ")
                res.redirect("/")
                console.log("contadeletada")
            }).catch((err) => {
                req.flash("error_msg", "erro ao deletar a conta. Contate-nos.")
                res.redirect("/perfis/perfil")
                console.log(err)
            });

        //-- enviando e-mail informando que a conta foi deletada --//
            Email.sendInfo(req.body.email, "Sua conta foi deletada.")

        } catch(err){
            console.log("erro ao deletar os tempos do banco de: " + req.user.name + err)
            req.flash("error_msg", "erro ao deletar a conta. Contate-nos.")
            res.redirect("/user/perfil")
        }

    });

//--Rota que chama o passport para a autenticação--//
    router.post('/authenticate', (req, res, next) => {
        passport.authenticate("local", {
            successRedirect: "/user/home", //caso o usuario seja autenticado
            failureRedirect: "/", // caso não seja autenticado
            failureFlash: true //ativando as mensagens flash
        })(req, res, next)
    })

module.exports = router