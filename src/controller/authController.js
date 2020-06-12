const express = require('express');

const User = require('../models/User');

const router = express.Router();

const passport = require('passport')


//rota de registrar usuaario
router.post('/registerUser', async (req, res) => {


    try{

        const user = await User.create(req.body);

        user.password = undefined;

        console.log("Cadastrado")


    } catch(err) {
        console.log("Deu erro: ", err)
    }
    req.flash("sucess_msg", "Cadastro realizado")
    res.redirect("/auth/login")
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
