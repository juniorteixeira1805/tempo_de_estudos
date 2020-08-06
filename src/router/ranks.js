//-- importações --//
const express = require('express');

const {eAdmin} = require("../helpers/eAdmin")

const mongoose = require("mongoose")

const User = mongoose.model("users")

const router = express.Router();

//-- rota responsavel por rendizar o rank em relação do tempo --//
    router.get('/por-tempo', eAdmin, async (req, res) => {
        //-- Passando todos os usuarios para a view --//
        try{
            User.find({}).sort({'historico.mes' : 'desc'}).then((usuarios) => {
                res.render("./rank/rankTempo", {usuarios: usuarios})
                console.log(req.user.name + " Esta na pagina por tempo")
                }).catch((err) => {
                res.redirect("/user/home")
                console.log(req.user.name +" deu erro ao entrar no rank por tempo: ", err)
                })
        } catch(err){
            res.redirect("/user/home")
            console.log(req.user.name +" deu erro ao entrar no rank por tempo: ", err)
        }
    })

//-- rota responsavel por rendizar o rank em relação do tempo --//
    router.get('/geral', eAdmin, async (req, res) => {
        //-- Passando todos os usuarios para a view --//
        try{
            User.find({}).sort({'historico.neutrinos' : 'desc'}).then((usuarios) => {

                res.render("./rank/rankgeral", {usuarios: usuarios})
                console.log(req.user.name + " Esta na pagina de rankGeral")
                }).catch((err) => {
                res.redirect("/user/home")
                console.log(req.user.name +" deu erro ao entrar no rank geral: ", err)
                })
        } catch (err){
            res.redirect("/user/home")
            console.log(req.user.name +" deu erro ao entrar no rank geral: ", err)
        }
    })

module.exports = router