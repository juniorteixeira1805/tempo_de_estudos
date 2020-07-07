//-- importações --//
const express = require('express');

const {eAdmin} = require("../helpers/eAdmin")

const mongoose = require("mongoose")

const Coletiva = require('../models/salaColetiva')

const router = express.Router();

//-- Rota que renderiza o registro de usuario --//
router.get('/salaColetiva', async (req, res) => {

    Coletiva.findOne({_id: "5f046a6bbba9ca166cda10f2"}).then((salas) => {

        res.render("./coletivas/sala", {salas: salas})
        //console.log(req.user.name + " Esta na pagina editarusuario vizualisando o historico de " +  req.params.id)

        }).catch((err) => {
       // res.redirect("/user/home")
        console.log("deu erro: ", err)
        })

})

module.exports = router