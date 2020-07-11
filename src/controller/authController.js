//--Importando os modulos--//
const express = require('express');

const User = require('../models/User');

const Tempo = require('../models/Tempo');

const Atividade = require('../models/Atividade');

const router = express.Router();

const passport = require('passport')

const Email = require("../config/nodemailer")

const bct = require('bcryptjs');
const { findOne } = require('../models/User');

//-- Rota para registrar Novo Usuario--//
    router.post('/registerUser', async (req, res) => {

        //--Criando novo usuario--//
        try{
            const user = await User.create(req.body);
            //-- enviando e-mail de boas bvindas --//
            Email.sendInfo(req.body.email, "Olá, estamos muito felizes que está no nosso time. Seja bem vindo! Lutaremos juntos para conquistar seu objeivo.")

            const data = new Date()
            var mile = data.getMilliseconds().toString()
            console.log(mile)
            //hasheando um numero
            const hash = await bct.hash(mile, 5);
            console.log(hash)
            //Atualizando o banco de dados
            await User.updateOne({email: req.body.email}, {codResete: hash}).then(() =>{}).catch((err) => {
                console.log("erro ao salvar codigo:" + err)
            })
            //-- enviando código de validação --//
            await Email.SendCode(req.body.email, hash)

            user.password = undefined; //-- para o que password não retorne no Json--//

            console.log(req.body.name + " Cadastrado")
            req.flash("sucess_msg", req.body.name+ ", seu cadastro foi realizado")
            res.redirect("/")

        } catch(err) {
            req.flash("error_msg", "Erro ao cadastrar! Tente outro E-mail.")
            res.redirect("/")
            console.log("Deu erro ao tentar cadastrar: ", err)
        }
    });

//-- Rota que é chamanda quando o botão de reenviar codigo de validação é selecionado --//
    router.post('/reenvia', async(req, res) =>{
        try{
            const data = new Date()
            var mile = data.getMilliseconds().toString()
            console.log(mile)
            //hasheando um numero
            const hash = await bct.hash(mile, 5);
            console.log(hash)
            //Atualizando o banco de dados
            await User.updateOne({email: req.body.email}, {codResete: hash}).then(() =>{}).catch((err) => {
                console.log("erro ao salvar codigo:" + err)
            })
            console.log(req.body.email)
            await Email.SendCode(req.body.email, hash)
            console.log(req.user.name + " reenviou o código a email")
            req.flash("sucess_msg", req.user.name+ ", seu código foi reenviado!")
            res.redirect("/user/home")
        }catch(err){
            req.flash("error_msg", "Erro ao reenviar!.")
            res.redirect("/user/home")
            console.log("erro reenviar email:" + err)
        }

    })

//--Rota que é chamada para a validação do email --//
    router.post('/validaEmail', async (req, res) => {

        if(req.body.codigo == req.user.codResete){
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
        Email.sendInfo(req.body.email, "Sua conta foi deletada.")

        try{
            //--Deletando do banco os tempos do usuario que será deletado--//
            Tempo.deleteMany({ estudante: req.body.id }, function (err) { //procurando todas as collections que tem o id que vem do body (usuario) como estudante
                console.log(req.user.name + " deletou os tempos")
                if (err) return handleError("Contate o suporte. Erro ao deletar os tempos: " + err);

            Atividade.deleteMany({ estudante: req.body.id }, function (err) { //procurando todas as collections que tem o id que vem do body (usuario) como estudante
                console.log(req.user.name + " deletou as atividades")
            })

                //--Deletando usuario do banco de dados--//
                User.deleteOne({_id: req.body.id}).then(() => { //--Procurando a collection que tem o id que vem do body (usuario)--//
                    console.log(req.user.name + " deletou sua conta")
                    req.flash("success_msg", "Conta deletada ")
                    res.redirect("/")
                    console.log("contadeletada")
                }).catch((err) => {
                    req.flash("error_msg", "erro ao deletar a conta. Contate-nos.")
                    res.redirect("/user/perfil")
                    console.log(err)
                });
            });
        } catch(err){
            console.log("erro ao deletar os tempos do banco de: " + req.user.name + err)
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