//-- importações --//
const express = require('express');
const {eAdmin} = require("../helpers/eAdmin")

const Resumo = require('../models/Resumo')
const Tag = require('../models/Tag')

const router = express.Router();
//-- Rota que renderiza todos os resumos --//
    router.get('/resumos', (req, res) => {
        Resumo.find({}).populate('tag').then( async(resumos) => {
            var tags = await Tag.find({})
            res.render("./resumos/resumosPublicos", {resumos: resumos, tag: tags}) 
        }).catch((err) => {
            res.send("Erro!" + err)
        })
    })

//-- Rota que renderiza todos os resumos --//
    router.get('/resumos-filtrado/:id', (req, res) => {
        Resumo.find({tag: req.params.id}).populate('tag').then( async(resumos) => {
            var tags = await Tag.find({})
            res.render("./resumos/resumosPublicos", {resumos: resumos, tag: tags}) 
        }).catch((err) => {
            res.send("Erro!" + err)
        })
    })

    //-- Rota que renderiza o historico --//
    router.get('/ler-resumo-publico/:id', async (req, res) => {
        await Resumo.findOne({ _id: req.params.id}).populate('responsavel').then((resumo) => {
                res.render("./resumos/lerResumoPublico", {resumo: resumo})
            }).catch((err) => {
                res.send("Erro" + err)
            })

    })

//-- Rota responsavel por listar todos os resumos do usuario --//
    router.get('/meus-resumos', eAdmin, (req, res) => {
        try{
            Resumo.find({responsavel: req.user._id}).populate('tag').then((resumos) => {
                res.render("./resumos/resumos", {resumos: resumos})
                console.log(req.user.name + "Está em sua sala de resumos")
                }).catch((err) => {
                res.redirect("/tempo/salaIndividual")
                console.log("deu erro ao entrar na sala de resumos: "+req.user.name+ err)
                })
        }catch(err){
            res.redirect("/tempo/salaIndividual")
            console.log("deu erro ao entrar na sala de resumos: "+req.user.name+ err)
        }
    })

//-- Rota responsavel por renderizar a pagina em que o usuario escreve o resumo --//
    router.get('/escrever-resumo', eAdmin,  (req, res) => {
        try{
        //-- Passando o model tag para que o usuario possa escolher uma tag do banco de dados --//
            Tag.find({}).then((tag) => {
                res.render("./resumos/escrever", {tag: tag})
                console.log(req.user.name + "Está em na sala de escrever resumos")
                }).catch((err) => {
                    res.redirect("/tempo/salaIndividual")
                    console.log("deu erro ao entrar na sala de escrever resumos: "+req.user.name+ err)
                })
        }catch(err){
            res.redirect("/tempo/salaIndividual")
            console.log("deu erro ao entrar na sala de resumos: "+req.user.name+ err)
        }
    })

//-- Rota responsavel por listar todo o resumos selecionado --//
    router.get('/ler-resumo/:id', (req, res) => {
        try{
            Resumo.findOne({_id: req.params.id}).then((resumo) => {
                res.render("./resumos/ler", {resumo: resumo})
                console.log(req.user.name + " está lendo um de seus resumos")
                }).catch((err) => {
                res.redirect("/tempo/salaIndividual")
                console.log("deu erro: ", err)
                })
        }catch(err){
            res.redirect("/tempo/salaIndividual")
            console.log("deu erro: ", err)
        }

    })

//-- Rota responsavel por renderizar a pagina em que o usuario adicionará uma nova tag --//
router.get('/adicionar-tag', eAdmin, (req, res) => {
        try{
            console.log(req.user.name+ " está na pagina de adicionar nova tag")
            res.render('./resumos/addTag')
        }catch(err){
            console.log(req.user.name+ " está na pagina de adicionar nova tag")
            res.render('./tempo/salaIndividual')
        }
    })

//-- Rota responsavel por renderizar a pagina em que o usuario irá editar o resumo --//
    router.get('/editar-resumo/:id', eAdmin,  (req, res) => {
        try{
            Resumo.findOne({_id: req.params.id}).populate('tag').then((resumo) => {
                res.render("./resumos/editresumo", {resumo: resumo})
                console.log(req.user.name + " está editando um de seus resumos")
                }).catch((err) => {
                res.redirect("/tempo/salaIndividual")
                console.log("deu erro: ", err)
                })
        }catch(err){
            res.redirect("/tempo/salaIndividual")
            console.log("deu erro: ", err)
        }
    })

module.exports = router