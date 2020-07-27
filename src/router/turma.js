//-- importações --//
const express = require('express');

const {eAdmin} = require("../helpers/eAdmin")

const mongoose = require("mongoose");

const User = mongoose.model("users")


const router = express.Router();

//--Rota para renderizar pagina de login//
    router.get('/adicionar-amigo', eAdmin, (req, res) =>{

        User.find({}).sort({name: 0}).then(async (usuarios) => {
            res.render("./turma/addamigo", {usuarios: usuarios})
            console.log(req.user.name + "Pagina de adicionar amigos")
        }).catch((err) => {
            res.render("./users/home")
        })
        
    });

//--Rota para renderizar pagina de login//
    router.get('/minha-turma', eAdmin, (req, res) =>{

        User.find({_id: req.user._id}).populate('turma').sort({dateCreater: 0}).then((amigos) => {
            
            res.render("./turma/minhaturma", {amigos: amigos})
            console.log(req.user.name + "Pagina home")
            }).catch((err) => {
            res.redirect("/user/home")
            console.log("deu erro: ", err)
        })
        
    });


module.exports = router