//-- importações --//
const express = require('express');

const {eAdmin} = require("../helpers/eAdmin")

const mongoose = require("mongoose")

const User = mongoose.model("users")

const Tempo = mongoose.model("tempos")

const Atividade = require('../models/Atividade')

const router = express.Router();


router.get('/loginG', (req, res) =>{
    res.render("./admin/loginG")
});

router.post('/verif', (req, res) =>{
    if(req.body.password == "47e9979ca3bbb2baaec9b2c483b41bc8"){
        res.redirect("/administradores/usuarios")
    }else{
        res.send("não deu certo")
    }
});

router.get('/usuarios', async (req, res) => {
          User.find({}).then((usuarios) => {
            res.render("./admin/usuarios", {usuarios: usuarios})
            }).catch((err) => {
            console.log("deu erro: ", err)
            })

    })

module.exports = router