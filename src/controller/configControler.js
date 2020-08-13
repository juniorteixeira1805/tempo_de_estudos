const express = require('express');
const User = require('../models/User');
const Dia = require('../models/Dia');
const router = express.Router();

//-- Rota para mudar a privacidade --//
router.post('/privacidade', async (req, res) => {
    try {
        var privRank = (req.body.rank == "false")
        var privSobre = (req.body.sobre == "false")
        var privBusca = (req.body.busca == "false")
    //-- Verificando qual o status de privacidade do usuario --//
        await User.findOneAndUpdate({_id: req.user._id}, {$set: {privacidade: {rank: privRank, sobre: privSobre, busca: privBusca}}}).then((req, res) => {}).catch((err) => {})

        console.log(req.user.name + " mudou a privacidade para: " + req.user.privacidade)
        req.flash("sucess_msg", "você mudou a privacidade")
        res.redirect("/config/config")
        
    } catch(err) {
        console.log("Deu erro: " + err)
        req.flash("sucess_msg", "erro")
        res.redirect("/config/config")
    }


})

    router.post('/registerDia', async (req, res) => {
        var data = await new Date
        var day = await data.getDate()
        var dayS = await data.getDay()
        var m = await (parseInt(data.getMonth()) + 1).toString()
        const novData = {
            dia: day,
            diaDaSemana: dayS,
            mes: m,
        }

    //-- persistindo no banco --//
        new Dia(novData).save().then( async () => {
            console.log(" Criou novo dia")
        }).catch((err) => {
            console.log("erro ao criar dia: "+err)
        })
    })

module.exports = router
