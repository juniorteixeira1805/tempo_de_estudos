//modulo que configura o passport
const localstrategy = require('passport-local');

const mongoose = require('mongoose');

const funcdata = require("../controller/tempoController")

const bct = require('bcryptjs');

//carregando o modulo o user
require('../models/User');
const User = mongoose.model("users");


module.exports = function(passport){
    passport.use(new localstrategy({usernameField: 'email'}, (email, password, done) => {
        User.findOne({email: email}).then((user) => {

            if(!(email) || !(password)){
                return done(null, false, {message: "Informe os dados para o login"});
            }

            if(!user){
                return done(null, false, {message: "Esta conta não existe"});
            }

            bct.compare(password, user.password, (erro, batem) => {
                if(batem){
                    return done(null, user);
                } else{
                    return done(null, false, {message: "Senha incorreta"});
                }
            })
        })
    }))

    passport.serializeUser((user, done) => {

        User.updateOne({_id: user.id}, {verificadorOnline: true}, function(err, res) {
        });

        funcdata.verifcaDia(user.diaAnterior);
        funcdata.verifcaSemana(user.semanaAnterior);
        funcdata.verifcaMes(user.mesAnterior);

        done(null, user.id);
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        })
    })
}

