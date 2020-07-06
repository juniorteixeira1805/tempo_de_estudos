//-- importações --//
const express = require('express');

const {eAdmin} = require("../helpers/eAdmin")

const mongoose = require("mongoose")

const User = mongoose.model("users")

const Tempo = mongoose.model("tempos")

const Atividade = require('../models/Atividade')

const router = express.Router();

//-- Rota que renderiza o registro de usuario --//
    router.get('/pomodoro', eAdmin, (req, res) => {
        res.render("./users/pomodoro")
    })

//-- Rota que renderiza o registro de usuario --//
    router.get('/aberto', eAdmin, (req, res) => {
        res.render("./users/aberto")
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

    router.get('/rank', eAdmin, async (req, res) => {
        //-- Passando todos os usuarios para a view --//
          User.find({}).sort({semana: -1}).then((usuarios) => {
            res.render("./users/rankgeral", {usuarios: usuarios})
            console.log(req.user.name + " Esta na pagina de rankGeral")
            }).catch((err) => {
            res.redirect("/user/rank")
            console.log("deu erro: ", err)
            })

    })

module.exports = router