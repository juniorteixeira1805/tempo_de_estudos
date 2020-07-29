const express = require('express');
const router = express.Router();

const {eAdmin} = require("../helpers/eAdmin")

const mongoose = require("mongoose")
const User = mongoose.model("users")


router.get('/config', eAdmin, (req, res) => {
        res.render("./users/config")
        console.log(req.user.name + "Em configurações")
    })


module.exports = router