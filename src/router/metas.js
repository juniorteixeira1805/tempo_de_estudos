//-- importações --//
const express = require('express');

const {eAdmin} = require("../helpers/eAdmin")

const Meta = require('../models/Meta');

const router = express.Router();

//-- rota responsavel por renderizar as metas do usuario --//
    router.get('/minhas-metas', eAdmin, (req, res) => {
        try{
            Meta.find({responsavel: req.user._id}).then((metas) => {
                res.render("./metas/metas", {metas: metas})
                console.log(req.user.name + "Está em sua sala de metas")
                }).catch((err) => {
                res.redirect("/tempo/salaIndividual")
                console.log("deu erro: ", err)
                })
        }catch(err){
            res.redirect("/tempo/salaIndividual")
            console.log("deu erro: ", err)
        }

    })

module.exports = router