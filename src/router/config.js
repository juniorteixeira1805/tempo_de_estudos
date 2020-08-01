const express = require('express');
const router = express.Router();

const {eAdmin} = require("../helpers/eAdmin")


router.get('/config', eAdmin, (req, res) => {
    console.log(req.user.name + " está na sala de configurações.")
        res.render("./users/config")
        console.log(req.user.name + "Em configurações")
    })


module.exports = router