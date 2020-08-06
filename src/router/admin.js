//-- importações --//
const express = require('express');

const {eAdmin} = require("../helpers/eAdmin")

const mongoose = require("mongoose")

const User = mongoose.model("users")

const Atividade = require('../models/Atividade')

const router = express.Router();

//-- rota responsavel por renderizar a tela de login dos adm --//
    router.get('/loginG', (req, res) =>{
        res.render("./admin/loginG")
    });

//-- rota responsavel por verificar a senha --//
    router.post('/verif', (req, res) =>{
        if((req.body.password == "47e9979ca3bbb2baaec9b") && ((req.body.email == "juniorteixeira1805@gmail.com") || (req.body.email == "alice@gmail.com"))){
            res.redirect("/administradores/usuarios")
        }else{
            res.send("não deu certo")
        }
    });

//-- rota responsavel por renderizar todos os usuarios --//
    router.get('/usuarios', async (req, res) => {
            User.find({}).then((usuarios) => {
            res.render("./admin/usuarios", {usuarios: usuarios})
            }).catch((err) => {
            console.log("deu erro: ", err)
            })
        })

module.exports = router