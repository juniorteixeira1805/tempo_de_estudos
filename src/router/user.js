//-- importações --//
const express = require('express');

const {eAdmin} = require("../helpers/eAdmin")

const {validarEmail} = require("../helpers/eAdmin")

const mongoose = require("mongoose")

const User = mongoose.model("users")

const Atividade = mongoose.model("atividades")




const router = express.Router();

//--Rota para renderizar pagina de login//
    router.get('/login', (req, res) =>{
        res.render("./users/login")
    });

        //--Rota para renderizar pagina de login//
        router.get('/conquistas', eAdmin , (req, res) =>{
            res.render("./visitantes/index")
        });

//-- Rota que renderiza o registro de usuario --//
router.get('/registrodeusuario', (req, res) => {
    res.render("./users/registro")
})

//-- Rota para renderizar tela de suporte --//
router.get('/suporte', (req, res) => {
    res.render("./users/suporte")
})

//-- Rota para renderizar tela de recuperar senha --//
router.get('/enviaEmail', (req, res) => {
    res.render("./users/informeEmail")
})

//-- Rota para renderizar tela da equipe --//

router.get('/equipe', (req, res) => {
    res.render("./admin/equipe")
})

//rota que renderiza pagina inicaial
    router.get('/home', validarEmail, async (req, res) => {

        try{
            //-- atualizando a data de vizita do usuario --//
            await User.updateOne({_id: req.user._id},{dataVizualização: new Date()}, function(err, res) {
                console.log(req.user.name + " atualizou a data de presença no site")
            });

            //-- peganndo o id dos amigos --//
            var amigosIds =  await (await User.findOne({_id: req.user._id}))
            
            //-- transformando m vetor de ids --//
            var vetorIds = amigosIds.turma
            var tam = vetorIds.length
            var i = 0
            var amigosReais = []

            //-- pegando os vetores com o eventos dos amigos --//
            while(i < tam){
                amigosReais.push(await User.findOne({_id: vetorIds[i]}).select('meusEventos'))
                i++
            }

            i=0
            var j=0
            //-- pegando a a quantidade de vetores detro do vetor --//
            var tamanhoAmigos = amigosReais.length
            var tamanhoEvento = 0
            var todosEventos = []
/*
            console.log(amigosReais[0].meusEventos.length)
            console.log(amigosReais[0].meusEventos)
            console.log(amigosReais[1].meusEventos.length)
            console.log(amigosReais[1].meusEventos[0])
            
*/          
        //-- parte responsavel por pegar todos os objetos "meusEventos" e concatenar no vetor todosEventos --//
            while(i < tamanhoAmigos){
                tamanhoEvento = amigosReais[i].meusEventos.length
                while(j < tamanhoEvento){
                    todosEventos.push(amigosReais[i].meusEventos[j])
                    j++
                }
                j=0
                i++
            }
        //-- ordenando todos os eventos --//
            todosEventos.sort()
        
        //-- Pega todas as atividades --//
        var atividades = (await (Atividade.find({estudante: req.user._id})))
        
                 
            res.render("./users/home", {eventos: todosEventos, atv: atividades})
        } catch (err){
            res.render("./users/home")
            console.log("Erro: " + err)
        }

    })


//-- Rora que renderiza a view de edição do usuario --//
    router.get('/editarusuario', eAdmin, (req, res) => {
        res.render("./users/editarUsuario")
        console.log(req.user.name + " Esta na pagina editarusuario")
    })

// rota que renderiza para fazer o logout
    router.get('/logout/:id', async (req,res) => {
    //-- Atualiza o status para offline --//
        try{
            console.log(req.user.name + " saiu")
            User.updateOne({_id: req.params.id}, {verificadorOnline: false}, function(err, res) {
            });
            req.logout()
            req.flash("sucess_msg", "Deslogado")
            res.redirect("/")
        }catch(err){
            console.log(err)
        }

    })

module.exports = router