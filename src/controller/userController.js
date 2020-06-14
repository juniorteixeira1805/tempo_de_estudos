const express = require('express');

const Tempo = require('../models/Tempo');

const User = require('../models/User');

const router = express.Router();

const {eAdmin} = require("../helpers/eAdmin")

const funcdata = require("../controller/tempoController")


//rota de registrar usuaario
router.post('/registerTempo', async (req, res) => {


    try{

        const data = new Date();
        
        const novoTempo = {
            inicio: req.body.inicio, //recebe o nome do formulario (referente ao formulario categoria)
            termino: req.body.termino,  //recebe o slug do formulario (referente ao formulario categoria)
            estudante: req.body.id,
            tipo: req.body.tipo,
            dateCreater: data,
            subTipo: req.body.subTipo,
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
            console.log(req.user.name + " Acresentou novo tempo")
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

router.post('/registerRecado', async (req, res) => {


    try{        

        await User.updateOne({_id: req.body.id}, {recado: req.body.recado}, function(err, res) {

        });
        console.log(req.user.name + " Registrou recado")
        req.flash("sucess_msg", "Seu recado foi salvo.") // apresenta na tela a msg de salvo
        res.redirect("/user/home") //redireciona para a pagina

    }
    
    catch(err) {
        req.flash("error_msg", "Houve um erro ao salvar") // apresenta uma mensagem de erro
        res.redirect("/user/home")
        console.log("Deu erro: ", err)
    }
})

router.post("/editPerfil", eAdmin, async (req, res) => {
    
    await User.updateOne({_id: req.body.id}, {name: req.body.name}, function(err, res) {
    });
    await User.updateOne({_id: req.body.id},{curso: req.body.curso}, function(err, res) {
    });
    await User.updateOne({_id: req.body.id}, {foto: req.body.foto}, function(err, res) {
    });
    await User.updateOne({_id: req.body.id}, {email: req.body.email}, function(err, res) {
    });
    console.log(req.user.name + " Editou o perfil")
    req.flash("sucess_msg", "Perfil editado")
    res.redirect("/user/home")

})

router.post('/privacidade', async (req, res) => {

    try {
        if(req.user.privacidade){
            await User.updateOne({_id: req.user._id}, {privacidade: false}, function(err, res) {
            });
        }
        else{
            await User.updateOne({_id: req.user._id}, {privacidade: true}, function(err, res) {
            });
        }

        console.log(req.user.name + " mudou a privacidade para: " + req.user.privacidade)
        req.flash("sucess_msg", "você mudou a privacidade")
        res.redirect("/user/home")
        
    } catch(err) {
        console.log("Deu erro: " + err)
        req.flash("sucess_msg", "você mudou a privacidade")
        res.redirect("/user/home")
    }


})

module.exports = router
