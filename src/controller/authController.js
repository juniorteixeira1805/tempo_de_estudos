//--Importando os modulos--//
const express = require('express');

const User = require('../models/User');

const Tempo = require('../models/Tempo');

const Atividade = require('../models/Atividade');

const router = express.Router();

const passport = require('passport')

//-- Rota para registrar Novo Usuario--//
    router.post('/registerUser', async (req, res) => {

        //--Criando novo usuario--//
        try{
            const user = await User.create(req.body);

            user.password = undefined; //-- para o que password não retorne no Json--//

            console.log(req.body.name + " Cadastrado")
            req.flash("sucess_msg", "Cadastro realizado")
            res.redirect("/")

        } catch(err) {
            req.flash("error_msg", "Erro ao cadastrar! Tente outro E-mail.")
            res.redirect("/")
            console.log("Deu erro ao tentar cadastrar: ", err)
        }
    });

//--Rota para deletar usuarios do banco de dados--//
    router.post('/deletarUser', (req, res) =>{

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