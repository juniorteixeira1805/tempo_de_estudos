//modulo que configura o passport
const localstrategy = require('passport-local');

const mongoose = require('mongoose');

const funcdata = require("../controller/tempoController") 

const bct = require('bcryptjs');

//carregando o modulo o user
require('../models/User');
const User = mongoose.model("users");

// configuração da autenticação
module.exports = function(passport){
    passport.use(new localstrategy({usernameField: 'email'}, (email, password, done) => {
        User.findOne({email: email}).then((user) => {
            
        //--Verificando se o formulario está vazio--//
            if(!(email) || !(password)){
                return done(null, false, {message: "Informe os dados para o login"});
            }

        //--Verificando a existencia do usuario--//
            if(!user){
                return done(null, false, {message: "Esta conta não existe"});
            }

        //--Verificando a se a senha está correta--//
            bct.compare(password, user.password, (erro, batem) => {
                if(batem){
                    return done(null, user);
                } else{
                    return done(null, false, {message: "Senha incorreta"});
                }
            })
        })
    }))

    //--Informa o que vai ser salvo na session--//
    passport.serializeUser((user, done) => {

    //--verificação de uma nova sessão--//
        try{

            //--Atualiza o status para online--//
            User.updateOne({_id: user.id}, {verificadorOnline: true}, function(err, res) {
            });
            
    
        } catch (err){
            console.log("Deu algum erro ao iniciar a sessão: " + err)
        }
        done(null, user.id);
    })


    //--Informa o que vai ser recuperado da session--//
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        })
    })
}

