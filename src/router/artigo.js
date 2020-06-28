const express = require('express');

const {eAdmin} = require("../helpers/eAdmin")
const router = express.Router();

const Artigo = require('../models/Artigo')

router.get('/registrodeartigos', eAdmin, (req, res) => {
    res.render("./artigos/cadastrarArtigo")
})

router.get('/meusArtigos', eAdmin, (req, res) => {
    console.log(req.user._id)
    Artigo.find({autor: req.user._id}).populate('autor').sort({dateCreater: -1}).then((artigos) => {
        res.render("./artigos/meusArtigos", {artigos: artigos})
        }).catch((err) => {
        res.redirect("/user/home")
        console.log("deu erro: ", err)
        })
})

router.get('/catalogo', (req, res) => {
    res.render("./artigos/escolherArtigo")
})

router.get('/areaEscolhida/:area', (req, res) => {
    console.log(req.params.area)
    Artigo.find({area: req.params.area}).populate('autor').sort({dateCreater: -1}).then((artigos) => {
        res.render("./artigos/areaEscolhida", {artigos: artigos})
        }).catch((err) => {
        res.redirect("/artigo/catalogo")
        console.log("deu erro: ", err)
        })
})

router.get('/meusArtigos', (req, res) => {
    Artigo.find({area: req.body.area}).sort({semana: -1}).then((artigos) => {
        res.render("./artigos/artigospublicos", {artigos: artigos})
        }).catch((err) => {
        res.redirect("/auth/login")
        console.log("deu erro: ", err)
        })
})

router.get('/editarArtigo/:id', (req, res) => {
    Artigo.findOne({_id: req.params.id}).then((artigos) => {
        res.render("./artigos/editar", {artigos: artigos})
        }).catch((err) => {
        res.redirect("/user/home")
        console.log("deu erro: ", err)
        })
})

module.exports = router