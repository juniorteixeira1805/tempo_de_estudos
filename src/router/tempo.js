//-- importações --//
const express = require('express');

const {eAdmin} = require("../helpers/eAdmin")

const mongoose = require("mongoose")

const User = mongoose.model("users")
const Sala = mongoose.model("individuais")
const Flashcards = mongoose.model("flashcards")
const Meta = mongoose.model("metas") // mongoose recupera o json
const router = express.Router();

//-- Rota que renderiza o registro de usuario --//
    router.get('/salaIndividual', eAdmin, (req, res) => {
        
        Sala.findOne({responsavel: req.user.id}).populate('tags').then( async (sala) => {

            let metas = await Meta.find({responsavel: req.user._id})

            res.render("./salaIndividual/salaIndividual", {sala: sala, metas: metas})
            console.log(req.user.name + "Está em sua sala")

            }).catch((err) => {
            res.redirect("/user/home")
            console.log("deu erro: ", err)
            })
    })
    //-- Rota que renderiza o registro de usuario --//
    router.get('/salaIndividualPublica', (req, res) => { 
        res.render("./salaIndividual/salaPublica")
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

//-- Rota que renderiza o registro de usuario --//
    router.get('/adicionar-card/:id', eAdmin, (req, res) => {
        Flashcards.findOne({_id: req.params.id}).then((card) => {
            res.render("./salaIndividual/addcard", {card: card})
            console.log(req.user.name + " está à adicionar card.")

            }).catch((err) => {
            res.redirect("/user/home")
            console.log("deu erro: ", err)
            })

    })

    router.get('/meus-flashcards', eAdmin, (req, res) => {
        
        Flashcards.find({responsavel: req.user._id}).then((cards) => {

            res.render("./salaIndividual/flashcards", {cards: cards})
            console.log(req.user.name + "Está em sua sala de flashcards")

            }).catch((err) => {
            res.redirect("/user/home")
            console.log("deu erro: ", err)
            })
    })
    
    router.get('/flashcards/:id', eAdmin, (req, res) => {
        
        Flashcards.findOne({_id: req.params.id}).then((card) => {

            console.log(card)

            res.render("./salaIndividual/utilizarflashcards", {card: card})
            console.log(req.user.name + "Está em sua sala de flashcards")

            }).catch((err) => {
            res.redirect("/user/home")
            console.log("deu erro: ", err)
            })
    })
    

module.exports = router