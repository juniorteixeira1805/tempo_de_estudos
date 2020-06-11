const express = require('express');

const Tempo = require('../models/Tempo');

const User = require('../models/User');

const router = express.Router();

const funcdata = require("../controller/tempoController")


//rota de registrar usuaario
router.post('/registerTempo', async (req, res) => {


    try{
    
        minutosTotal = funcdata.tempoEstudado(req.body.inicio, req.body.termino)
        minutosTotal = parseInt(minutosTotal) + parseInt(req.body.dia)        
        await User.updateOne({_id: req.body.id}, {dia: minutosTotal}, function(err, res) {
        });
        
        const novoTempo = {
            inicio: req.body.inicio, //recebe o nome do formulario (referente ao formulario categoria)
            termino: req.body.termino,  //recebe o slug do formulario (referente ao formulario categoria)
            estudante: req.body.id,

        }

        minutosNoDia = funcdata.tempoEstudado(req.body.inicio, req.body.termino)
        minutosTotalNoDia = parseInt(minutosNoDia) + parseInt(req.body.dia)        
        await User.updateOne({_id: req.body.id}, {dia: minutosTotalNoDia}, function(err, res) {
        });

        minutosTotalNoSemana = minutosNoDia + parseInt(req.body.semana)        
        await User.updateOne({_id: req.body.id}, {semana: minutosTotalNoSemana}, function(err, res) {
        });

        minutosTotalNoMes = minutosNoDia + parseInt(req.body.mes)        
        await User.updateOne({_id: req.body.id}, {mes: minutosTotalNoMes}, function(err, res) {
        });

        minutosTotalNoTotal = minutosNoDia + parseInt(req.body.total)        
        await User.updateOne({_id: req.body.id}, {total: minutosTotalNoTotal}, function(err, res) {
        });
    
        new Tempo(novoTempo).save().then( async () => {

            req.flash("sucess_msg", "tempo salvo com sucesso") // apresenta na tela a msg de salvo
            res.redirect("/user/home") //redireciona para a pagina
        }).catch((err) => {
            console.log(err)
            req.flash("error_msg", "Houve um erro ao salvar") // apresenta uma mensagem de erro
            res.redirect("/user/home") // redireciona para a pagina
        })


    }
    
    catch(err) {
        console.log("Deu erro: ", err)
    }
})


router.get('/login', (req, res) =>{
    res.render("./users/login")
})

router.post('/authenticate', (req, res, next) => {
    
    passport.authenticate("local", {
        successRedirect: "/user/home",
        failureRedirect: "/auth/login",
        failureFlash: true
    })(req, res, next)
})

module.exports = router
