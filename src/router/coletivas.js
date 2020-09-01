//-- importações --//
const express = require('express');

const {eAdmin} = require("../helpers/eAdmin")

const mongoose = require("mongoose");

require('../models/salaColetiva')

require('../models/User')

const Coletiva = mongoose.model('coletivas')

const User = mongoose.model('users')
const router = express.Router();

//--Rota para renderizar pagina de login//
    router.get('/minhas-salas-coletivas', eAdmin, async (req, res) =>{
        await User.findOne({_id: req.user._id}).select('coletivas').populate('coletivas.coletiva').then(async (coletivas) => {
            var minhaCol = await Coletiva.findOne({responsavel: req.user._id})
                res.render("./coletivas/minhasSalas", {coletivas: coletivas, minhaSala: minhaCol})
                console.log(req.user.name + "Pagina de adicionar amigos")
        }).catch((err) => {
            req.flash("Houve um erro ao listar o usuario. Entre em contato com o suporte." + err) // apresenta uma mensagem de erro
            res.render("./users/home")
        })
        
    });


//--Rota para renderizar pagina de login//
    router.get('/minha-sala-coletiva', eAdmin, async (req, res) =>{
        await Coletiva.findOne({responsavel: req.user._id}).populate('participantes.participante').then(async (coletivas) => {
            var feed = await Coletiva.findOne({responsavel: req.user._id}).populate('feed.participante')
            feed = feed.feed
            //-- ordenando todos os eventos --//
            function comparar(a, b) {
                if (a.dateCreater > b.dateCreater ) {

                return -1;
                }
                if (a.dateCreater < b.dateCreater ) {
                return 1;
                }
                // a deve ser igual a b
            }
            
            feed.sort(comparar)
                res.render("./coletivas/salaColetiva", {coletivas: coletivas, feed: feed})
                console.log(req.user.name + "Pagina de adicionar amigos")
        }).catch((err) => {
            req.flash("Houve um erro ao listar o usuario. Entre em contato com o suporte." + err) // apresenta uma mensagem de erro
            res.render("./users/home")
        })
        
    });

    //--Rota para renderizar pagina de login//
    router.get('/sala-coletiva/:id', eAdmin, async (req, res) =>{
        await Coletiva.findOne({_id: req.params.id}).populate('participantes.participante').then(async (coletivas) => {
            var feed = await Coletiva.findOne({_id: req.params.id}).populate('feed.participante')
            feed = feed.feed
            //-- ordenando todos os eventos --//
            function comparar(a, b) {
                if (a.dateCreater > b.dateCreater ) {

                return -1;
                }
                if (a.dateCreater < b.dateCreater ) {
                return 1;
                }
                // a deve ser igual a b
            }
            
            feed.sort(comparar)
            res.render("./coletivas/salas", {coletivas: coletivas, feed: feed})
            console.log(req.user.name + "Pagina de adicionar amigos")
        }).catch((err) => {
            console.log(err)
            res.render("./users/home")
        })
        
    });


module.exports = router