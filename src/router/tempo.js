//-- importações --//
const express = require('express');

const {eAdmin} = require("../helpers/eAdmin")

const mongoose = require("mongoose")

const User = mongoose.model("users")
const Sala = mongoose.model("individuais")
const Meta = mongoose.model("metas") // mongoose recupera o json
const router = express.Router();

//-- Rota que renderiza o registro de usuario --//
    router.get('/salaIndividual', eAdmin, (req, res) => {
        
        Sala.findOne({responsavel: req.user.id}).then( async (sala) => {

            let metas = await Meta.find({responsavel: req.user._id})

            res.render("./salaIndividual/salaIndividual", {sala: sala, metas: metas})
            console.log(req.user.name + "Está em sua sala")

            }).catch((err) => {
            res.redirect("/user/home")
            console.log("deu erro: ", err)
            })
    })

    router.get('/notas', eAdmin, (req, res) => {
        
        Sala.findOne({responsavel: req.user.id}).then((sala) => {

            res.render("./salaIndividual/notas", {sala: sala})
            console.log(req.user.name + "Está em sua sala de notas")

            }).catch((err) => {
            res.redirect("/user/home")
            console.log("deu erro: ", err)
            })
    })


//-- Rota que renderiza o registro de usuario --//
    router.get('/aberto', eAdmin, (req, res) => {
        console.log(req.user.name + " está na sala do tempo.")
        res.render("./users/aberto")
    })

module.exports = router