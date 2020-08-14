//-- importações --//
const express = require('express');

const {eAdmin} = require("../helpers/eAdmin")

const mongoose = require("mongoose")

const User = mongoose.model("users")

const router = express.Router();
//-- rota responsavel por rendizar o rank em relação do tempo --//
router.get('/estudo', eAdmin, async (req, res) => {
    //-- Passando todos os usuarios para a view --//
    try{
        User.find({}).sort({'historico.totalEstudo' : 'desc'}).then((usuarios) => {
            res.render("./rank/estudo", {usuarios: usuarios})
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
router.get('/aula', eAdmin, async (req, res) => {
    //-- Passando todos os usuarios para a view --//
    try{
        User.find({}).sort({'historico.totalAula' : 'desc'}).then((usuarios) => {
            res.render("./rank/aula", {usuarios: usuarios})
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
router.get('/leitura', eAdmin, async (req, res) => {
    //-- Passando todos os usuarios para a view --//
    try{
        User.find({}).sort({'historico.totalLeitura' : 'desc'}).then((usuarios) => {
            res.render("./rank/leitura", {usuarios: usuarios})
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
router.get('/pesquisa', eAdmin, async (req, res) => {
    //-- Passando todos os usuarios para a view --//
    try{
        User.find({}).sort({'historico.totalPesquisa' : 'desc'}).then((usuarios) => {
            res.render("./rank/pesquisa", {usuarios: usuarios})
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
router.get('/exercicio', eAdmin, async (req, res) => {
    //-- Passando todos os usuarios para a view --//
    try{
        User.find({}).sort({'historico.totalExercicio' : 'desc'}).then((usuarios) => {
            res.render("./rank/exercicio", {usuarios: usuarios})
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
router.get('/resumos', eAdmin, async (req, res) => {
    //-- Passando todos os usuarios para a view --//
    try{
        User.find({}).sort({'resumos' : 'desc'}).then((usuarios) => {
            res.render("./rank/resumos", {usuarios: usuarios})
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
    router.get('/mensal', eAdmin, async (req, res) => {
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
    router.get('/semanal', eAdmin, async (req, res) => {
        //-- Passando todos os usuarios para a view --//
        try{
            User.find({}).sort({'historico.semana' : 'desc'}).then((usuarios) => {
                res.render("./rank/semanal", {usuarios: usuarios})
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
    router.get('/diario', eAdmin, async (req, res) => {
        //-- Passando todos os usuarios para a view --//
        try{
            User.find({}).sort({'historico.dia' : 'desc'}).then((usuarios) => {
                res.render("./rank/diario", {usuarios: usuarios})
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