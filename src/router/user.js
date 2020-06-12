const express = require('express');

const {eAdmin} = require("../helpers/eAdmin")

const mongoose = require("mongoose")

const User = mongoose.model("users")

const Tempo = mongoose.model("tempos")

const router = express.Router();



//rota que renderiza pagina inicaial
    router.get('/home', eAdmin, async (req, res) => {

          User.find({}).sort({dia: -1}).then((usuarios) => {

            res.render("./users/home", {usuarios: usuarios})
            }).catch((err) => {
            res.redirect("/user/home")
            console.log("deu erro: ", err)
            })

    })

    router.get('/registrodeusuario', (req, res) => {
        res.render("./users/registro")
    })

    router.get('/editarusuario', eAdmin, (req, res) => {
        res.render("./users/editarUsuario")
    })

    router.get('/perfil/:id', eAdmin, async (req, res) => {

        Tempo.find({'estudante': req.params.id}).populate("estudante").then((tempos) => {

            res.render("./users/perfil", {tempos: tempos})
            }).catch((err) => {
            res.redirect("/user/home")
            console.log("deu erro: ", err)
            })

    })


// rota que renderiza para fazer o logout
    router.get('/logout/:id', async (req,res) => {

        User.updateOne({_id: req.params.id}, {verificadorOnline: false}, function(err, res) {
        });

        req.logout()
        req.flash("sucess_msg", "Deslogado")
        res.redirect("/auth/login")
    })



module.exports = router