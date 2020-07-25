//-- importações --//
const express = require('express');

const {eAdmin} = require("../helpers/eAdmin")

const {validarEmail} = require("../helpers/eAdmin")

const mongoose = require("mongoose")

const User = mongoose.model("users")

const Atividade = require('../models/Atividade')

const router = express.Router();

//-- Rota que renderiza o registro de usuario --//
router.get('/registrodeusuario', (req, res) => {
    res.render("./users/registro")
})

//-- Rota para renderizar tela de suporte --//
router.get('/suporte', (req, res) => {
    res.render("./users/suporte")
})

//-- Rota para renderizar tela de recuperar senha --//
router.get('/enviaEmail', (req, res) => {
    res.render("./users/informeEmail")
})

//-- Rota para renderizar tela da equipe --//

router.get('/equipe', (req, res) => {
    res.render("./admin/equipe")
})

//rota que renderiza pagina inicaial
    router.get('/home', validarEmail, async (req, res) => {
        await User.updateOne({_id: req.user._id},{dataVizualização: new Date()}, function(err, res) {
            console.log(req.user.name + " atualizou a data de presença no site")
        });
        
        //-- Passando todos os usuarios para a view --//
        Atividade.find({'estudante': req.user.id}).sort({horarioInicial: 0}).then((atv, tempos) => {
            res.render("./users/home", {atv: atv, tempos: tempos})
            console.log(req.user.name + "Pagina home")
            }).catch((err) => {
            res.redirect("/user/home")
            console.log("deu erro: ", err)
            })

    })


//-- Rora que renderiza a view de edição do usuario --//
    router.get('/editarusuario', eAdmin, (req, res) => {
        res.render("./users/editarUsuario")
        console.log(req.user.name + " Esta na pagina editarusuario")
    })

//-- Rota que renderiza a view do perfil --//
    router.get('/meuperfil', validarEmail, async (req, res) => {

        console.log(req.user.name + " Esta na pagina perfil")
        Atividade.find({'estudante': req.user.id}).sort({horarioInicial: 0}).then((atv) => {

            res.render("./users/meuPerfil", {atv: atv})
            }).catch((err) => {
            res.redirect("/user/home")
            console.log("deu erro: ", err)
            })

    })

// rota que renderiza para fazer o logout
    router.get('/logout/:id', async (req,res) => {
    //-- Atualiza o status para offline --//
        try{
            console.log(req.user.name + " saiu")
            User.updateOne({_id: req.params.id}, {verificadorOnline: false}, function(err, res) {
            });
            req.logout()
            req.flash("sucess_msg", "Deslogado")
            res.redirect("/")
        }catch(err){
            console.log(err)
        }

    })

module.exports = router