const express = require('express');

const User = require('../models/User');

const Tempo = require('../models/Tempo');

const router = express.Router();

const passport = require('passport')


//rota de registrar usuaario
router.post('/registerUser', async (req, res) => {


    try{

        const user = await User.create(req.body);

        user.password = undefined;

        console.log(req.body.name + " Cadastrado")


    } catch(err) {
        req.flash("error_msg", "Erro ao cadastrar! Tente outro usuario.")
        res.redirect("/auth/login")
        console.log("Deu erro ao tentar cadastrar: ", err)
    }
    req.flash("sucess_msg", "Cadastro realizado")
    res.redirect("/auth/login")
})

router.get('/login', (req, res) =>{
    res.render("./users/login")
})

router.post('/deletarUser', (req, res) =>{

    Tempo.deleteMany({ estudante: req.body.id }, function (err) {
        console.log(req.user.name + " deletou os tempos")
        if (err) return handleError(err);
        // deleted at most one tank document
      });
    

    User.deleteOne({_id: req.body.id}).then(() => {
        console.log(req.user.name + " deletou sua conta")
        req.flash("success_msg", "Conta deletada ")
        res.redirect("/auth/login")
        console.log("contadeletada")
    }).catch((err) => {
        req.flash("error_msg", "erro ao deletar a conta. Contate-nos.")
        res.redirect("/user/perfil")
        console.log(err)
    })
})

router.post('/authenticate', (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/user/home",
        failureRedirect: "/auth/login",
        failureFlash: true
    })(req, res, next)
})

module.exports = router
