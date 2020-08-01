//-- Rota que renderiza a view do perfil --//
//-- importações --//
const express = require('express');
const router = express.Router();

const {eAdmin} = require("../helpers/eAdmin")

const mongoose = require("mongoose")

const User = mongoose.model("users")
const Atividade = mongoose.model("atividades")
const Resumo = mongoose.model("resumos")
const Meta = mongoose.model("metas")

router.get('/meuperfil', eAdmin, async (req, res) => {
    Atividade.find({'estudante': req.user.id}).sort({horarioInicial: 0}).then((atv) => {
        console.log(req.user.name + " está vendo seu perfil.")
        res.render("./perfis/meuPerfil", {atv: atv})
        }).catch((err) => {
        res.redirect("/user/home")
        console.log("deu erro: ", err)
        })

})

//-- Rota que renderiza o historico --//
router.get('/perfil/:id', eAdmin, async (req, res) => {
    await User.findOne({ _id: req.params.id}).then((users) => {
        res.render("./perfis/perfis", {users: users})
        console.log(req.user.name + " Esta vizualisando o historico de " +  req.params.id )

        }).catch((err) => {
        res.redirect("/user/home")
        console.log("deu erro: ", err)
        })

})

//-- Rota que renderiza o historico --//
    router.get('/historico/:id', eAdmin, async (req, res) => {
        User.findOne({ _id: req.params.id}).sort({dateCreater: -1}).select('tempos').then((users) => {
            res.render("./perfis/historico", {users: users})
            console.log(req.user.name + " Esta vizualisando o historico de " +  req.params.id)

            }).catch((err) => {
            res.redirect("/perfis/perfis")
            console.log("deu erro: ", err)
            })

    })

//-- Rota que renderiza o historico --//
    router.get('/resumos/:id', eAdmin, async (req, res) => {
        Resumo.find({ responsavel: req.params.id}).sort({dateCreater: -1}).populate('tag').then((resumos) => {
            res.render("./perfis/resumos", {resumos: resumos})
            console.log(req.user.name + " Esta vizualisando os resumo de " +  req.params.id)

            }).catch((err) => {
            res.redirect("/perfis/perfis")
            console.log("deu erro: ", err)
            })

    })

//-- Rota que renderiza o historico --//
    router.get('/ler-resumo/:id', eAdmin, async (req, res) => {
        Resumo.findOne({ _id: req.params.id}).sort({dateCreater: -1}).then((resumo) => {
            res.render("./perfis/lerResumo", {resumo: resumo})
            console.log(req.user.name + " Esta vizualisando o resumo" +  req.params.id)

            }).catch((err) => {
            res.redirect("/perfis/perfis")
            console.log("deu erro: ", err)
            })

    })

    //-- Rota que renderiza o historico --//
    router.get('/metas/:id', eAdmin, async (req, res) => {
        Meta.find({ responsavel: req.params.id}).then((metas) => {
            res.render("./perfis/metas", {metas: metas})
            console.log(req.user.name + " Esta vizualisando as metas de " +  req.params.id)

            }).catch((err) => {
            res.redirect("/perfis/perfis")
            console.log("deu erro: ", err)
            })

    })

//-- Rota que renderiza o historico --//
    router.get('/conquistas/:id', eAdmin, async (req, res) => {
        User.findOne({ _id: req.params.id}).sort({dateCreater: -1}).select('historico').then((users) => {
            res.render("./perfis/conquistas", {users: users})
            console.log(req.user.name + " Esta vizualisando as conquistas de " +  req.params.id)

            }).catch((err) => {
            res.redirect("/perfis/perfis")
            console.log("deu erro: ", err)
            })
    })

    router.get('/cronograma', eAdmin, async (req, res) => {
        Atividade.find({estudante: req.user._id}).sort({horarioInicial: 0}).then((atv) => {
            console.log(req.user.name + " está na sala de cronograma.")
            res.render("./perfis/cronograma", {atv: atv})
            }).catch((err) => {
            res.redirect("/perfis/meuPerfil")
            console.log("deu erro: ", err)
            })
    
    })

module.exports = router