//-- Importando modulos --//
const express = require('express');
const router = express.Router();
const User = require('../models/User');
    
//-- Rota que registra novo tempo pelo metodo aberto --//
router.post('/addAmigo', async (req, res) => {
    try{
        //-- persistindo no banco de dados --//

        var amigosIds =  await (await User.findOne({_id: req.user._id}).select('turma'))
        var vetorIds = await amigosIds.turma
        var tam = await vetorIds.length

        var i = await 0
        var verif = await true

        while(i<tam){
            if(vetorIds[i] == req.body.id){
                verif = await false
                break
            }
            i++
        }

        if(verif){
            await User.findOneAndUpdate({ _id: req.user._id }, {$push: { turma: req.body.id} }).then(async () =>{
                console.log(req.user.name+ ", enturmou novo amigo")
                req.flash("sucess_msg", req.user.name+ ", Você enturmou um novo amigo a sua galera") // apresenta na tela a msg de salvo
                res.redirect("/turma/adicionar-amigo") //redireciona para a pagina
            }).catch((err) => {
                console.log("erro ao cadastrar meta: "+ err)
                req.flash("error_msg",req.user.name + "Houve um erro ao enturmar seu amigo. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
                res.redirect("/turma/adicionar-amigo") // redireciona para a pagina
            })
        }else{
            console.log("erro ao enturmar amigo: " )
            req.flash("error_msg", "Este amigo já está na sua turma.") // apresenta uma mensagem de erro
            res.redirect("/turma/adicionar-amigo") // redireciona para a pagina
        }
    } catch(err) {
        console.log("erro ao acrescentar tempo: " +err)
        req.flash("error_msg", "Houve um erro ao salvar") // apresenta uma mensagem de erro
        res.redirect("/turma/adicionar-amigo") // redireciona para a pagina
    }
})

//-- Rota que registra novo tempo pelo metodo aberto --//
router.post('/addAmigoPerfil', async (req, res) => {
    try{
        //-- persistindo no banco de dados --//

        var amigosIds =  await (await User.findOne({_id: req.user._id}).select('turma'))
        var vetorIds = await amigosIds.turma
        var tam = await vetorIds.length
        var i = await 0
        var verif = await true

        while(i<tam){
            if(vetorIds[i] == req.body.id){
                verif = await false
                break
            }
            i++
        }

        if(verif){
            await User.findOneAndUpdate({ _id: req.user._id }, {$push: { turma: req.body.id} }).then(async () =>{
                console.log(req.user.name+ ", enturmou novo amigo")
                req.flash("sucess_msg", req.user.name+ ", Você enturmou um novo amigo a sua galera") // apresenta na tela a msg de salvo
                res.redirect("/rank/geral") //redireciona para a pagina
            }).catch((err) => {
                console.log("erro ao cadastrar meta: "+ err)
                req.flash("error_msg",req.user.name + "Houve um erro ao enturmar seu amigo. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
                res.redirect("/rank/geral") // redireciona para a pagina
            })
        }else{
            console.log("erro ao enturmar amigo: " )
            req.flash("error_msg", "Este amigo já está na sua turma.") // apresenta uma mensagem de erro
            res.redirect("/rank/geral") // redireciona para a pagina
        }
    } catch(err) {
        console.log("erro ao acrescentar tempo: " +err)
        req.flash("error_msg", "Houve um erro ao salvar") // apresenta uma mensagem de erro
        res.redirect("/rank/geral") // redireciona para a pagina
    }
})

//--Rota para deletar tempo do banco de dados--//
router.post('/excluirAmigo', async (req, res) =>{
    //-- removendo elemento --//
    try{
        console.log( req.body.id)
        User.findOneAndUpdate({ _id: req.user._id },{ $pull: { turma: req.body.id } }).then( async() =>{
        
        console.log(req.user.name+ ", 'amigo'retirado")
        req.flash("sucess_msg", req.user.name+ ", seu 'amigo'retirado") // apresenta na tela a msg de salvo
        res.redirect("/turma/minha-turma") //redireciona para a pagina
       }).catch((err) => {
        console.log("erro ao deletar tempo: "+err)
        req.flash("error_msg",req.user.name + "Houve um erro. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
        res.redirect("/turma/minha-turma") // redireciona para a pagina

    })} catch(err){
        console.log("erro ao deletar meta: "+err)
        req.flash("error_msg",req.user.name + "Houve um erro. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
        res.redirect("/user/minha-turma") // redireciona para a pagina
    }
});

module.exports = router
