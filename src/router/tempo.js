//-- importações --//
const express = require('express');

const {eAdmin} = require("../helpers/eAdmin")

const mongoose = require("mongoose")

const User = mongoose.model("users")
const Resumo = require('../models/Resumo')
const Tag = require('../models/Tag')
const Sala = mongoose.model("individuais")

const router = express.Router();

//-- Rota que renderiza o registro de usuario --//
    router.get('/salaIndividual', eAdmin, (req, res) => {
        
        Sala.findOne({responsavel: req.user.id}).then((sala) => {

            res.render("./salaIndividual/salaIndividual", {sala: sala})
            console.log(req.user.name + "Está em sua sala")

            }).catch((err) => {
            res.redirect("/user/home")
            console.log("deu erro: ", err)
            })
    })

    router.get('/notas', eAdmin, (req, res) => {
        
        Sala.findOne({responsavel: req.user.id}).then((sala) => {

            res.render("./salaIndividual/notas", {sala: sala})
            console.log(req.user.name + "Está em sua sala")

            }).catch((err) => {
            res.redirect("/user/home")
            console.log("deu erro: ", err)
            })
    })

    router.get('/metas', eAdmin, (req, res) => {
        
        Sala.findOne({responsavel: req.user.id}).then((sala) => {

            res.render("./salaIndividual/metas", {sala: sala})
            console.log(req.user.name + "Está em sua sala")

            }).catch((err) => {
            res.redirect("/user/home")
            console.log("deu erro: ", err)
            })
    })

//-- Rota que renderiza o registro de usuario --//
    router.get('/aberto', eAdmin, (req, res) => {
        res.render("./users/aberto")
    })

//-- Rota que renderiza o historico --//
    router.get('/perfil/:id', eAdmin, async (req, res) => {
        User.findOne({ _id: req.params.id}).sort({dateCreater: -1}).then((users) => {
            res.render("./users/perfis", {users: users})
            console.log(req.user.name + " Esta vizualisando o historico de " +  req.params.id)

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