//-- importações --//
const express = require('express');

const {eAdmin} = require("../helpers/eAdmin")

const mongoose = require("mongoose")

const User = mongoose.model("users")

const router = express.Router();

//-- rota responsavel por renderizar a tela de login dos adm --//
    router.get('/login', (req, res) =>{
        res.render("./admin/loginG")
    });

//-- rota responsavel por verificar a senha --//
    router.post('/verif', (req, res) =>{
        if((req.body.password == "Noiroved@1209") && ((req.body.email == "devorion01@gmail.com"))){
            res.redirect("/adm/usuarios")
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