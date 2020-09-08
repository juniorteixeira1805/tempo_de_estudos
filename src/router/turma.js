//-- importações --//
const express = require('express');

const {eAdmin} = require("../helpers/eAdmin")

const mongoose = require("mongoose");

const User = require('../models/User')


const router = express.Router();

//--Rota para renderizar pagina de login//
    router.get('/adicionar-amigo', eAdmin, async (req, res) =>{
        
        var user = User.find({email: req.query.email})

        if((user != null) && (user != undefined) && (user != "")){
            User.find({email: req.query.email}).then(async (usuarios) => {
                req.flash("sucess_msg", "Encontrado resultado  da busca.") // apresenta na tela a msg de salvo
                res.render("./turma/addamigo", {usuarios: usuarios})
                console.log(req.user.name + "Pagina de adicionar amigos")
        }).catch((err) => {
            req.flash("Houve um erro ao listar o usuario. Entre em contato com o suporte.") // apresenta uma mensagem de erro
            res.render("./turma/minhaturma")
        })
        } else {
            req.flash("O campo não pode ser vazio.") // apresenta uma mensagem de erro
            res.render("./turma/minhaturma")
        }

        
    });

//--Rota para renderizar pagina de login//
    router.get('/minha-turma', eAdmin, (req, res) =>{

        User.find({_id: req.user._id}).populate('turma').sort({dateCreater: 0}).then((amigos) => {
            
            res.render("./turma/minhaturma", {amigos: amigos})
            console.log(req.user.name + "Pagina da sua turma")
            }).catch((err) => {
            res.redirect("/user/home")
            console.log("deu erro: ", err)
        })
        
    });


module.exports = router