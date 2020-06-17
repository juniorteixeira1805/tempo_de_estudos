//-- importações --//
const express = require('express');

const {eAdmin} = require("../helpers/eAdmin")

const mongoose = require("mongoose")

const User = mongoose.model("users")

const Tempo = mongoose.model("tempos")

const Atividade = require('../models/Atividade')

const router = express.Router();

//rota que renderiza pagina inicaial
    router.get('/home', eAdmin, async (req, res) => {
    //-- atualizando status para online --//
        User.updateOne({_id: req.user.id}, {verificadorOnline: true}, function(err, res) {
        });
        //-- Passando todos os usuarios para a view --//
          User.find({}).sort({semana: -1}).then((usuarios) => {
            res.render("./users/home", {usuarios: usuarios})
            console.log(req.user.name + " Esta na pagina home")
            }).catch((err) => {
            res.redirect("/user/home")
            console.log("deu erro: ", err)
            })

    })
//-- Rota que renderiza o registro de usuario --//
    router.get('/registrodeusuario', (req, res) => {
        res.render("./users/registro")
    })

//-- Rora que renderiza a view de edição do usuario --//
    router.get('/editarusuario', eAdmin, (req, res) => {
        res.render("./users/editarUsuario")
        console.log(req.user.name + " Esta na pagina editarusuario")
    })

//-- Rota que renderiza a view do perfil --//
    router.get('/perfil', eAdmin, async (req, res) => {

        console.log(req.user.name + " Esta na pagina perfil")
        Atividade.find({'estudante': req.user.id}).sort({horarioInicial: 0}).then((atv) => {

            res.render("./users/perfil", {atv: atv})
            }).catch((err) => {
            res.redirect("/user/home")
            console.log("deu erro: ", err)
            })

    })

//-- Rota que renderiza o historico --//
    router.get('/historico/:id', eAdmin, async (req, res) => {

        Tempo.find({'estudante': req.params.id}).populate('estudante').sort({dateCreater: -1}).then((tempos) => {

            res.render("./users/historico", {tempos: tempos})
            console.log(req.user.name + " Esta na pagina editarusuario vizualisando o historico de " +  req.params.id)

            }).catch((err) => {
            res.redirect("/user/home")
            console.log("deu erro: ", err)
            })

    })

//-- Rota que renderiza o historico --//
    router.get('/historicoPessoal/:id', eAdmin, async (req, res) => {

        Tempo.find({'estudante': req.params.id}).populate('estudante').sort({dateCreater: -1}).then((tempos) => {

            res.render("./users/historicoPessoal", {tempos: tempos})
            console.log(req.user.name + " Esta na pagina editarusuario vizualisando o historico de " +  req.params.id)

            }).catch((err) => {
            res.redirect("/user/home")
            console.log("deu erro: ", err)
            })

    })

//-- Rota que renderiza a view sala de leitura --//
    router.get('/saladeleitura',eAdmin, (req, res) => {
        console.log(req.user.name + " Esta na pagina saladeleitura")
        res.render("./users/biblioteca")
    })

//--  --//
// rota que renderiza para fazer o logout
    router.get('/logout/:id', async (req,res) => {
    //-- Atualiza o status para offline --//
        try{
            console.log(req.user.name + " saiu")
            User.updateOne({_id: req.params.id}, {verificadorOnline: false}, function(err, res) {
            });
            req.logout()
            req.flash("sucess_msg", "Deslogado")
            res.redirect("/auth/login")
        }catch(err){
            console.log(err)
        }

    })

module.exports = router