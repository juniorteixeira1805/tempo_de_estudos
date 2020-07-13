//--Importando os modulos--//
const express = require('express');

const Individual = require('../models/salaIndividual');

const router = express.Router();

router.post('/registerIndividual', async (req, res) => {

    //--Criando Sala--//
    try{
        const novaIndividual = { //-- Recebendo valores --//
            responsavel: req.user.id,
            dateCreaterSala: Date.now(),
            nomeSala: req.body.nomeSala,

        }

        new Individual(novaIndividual).save().then( async () => {
            console.log(req.user.name+" Criou nova sala")
            req.flash("sucess_msg", req.user.name+ ", sua sala foi cadastrada") // apresenta na tela a msg de salvo
            res.redirect("/tempo/salaIndividual") //redireciona para a pagina
        }).catch((err) => {
            console.log("erro ao cadastrar sala: "+err)
            req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar sua sala. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
           res.redirect("/user/home") // redireciona para a pagina
        })


    } catch(err) {
        console.log("erro ao cadastrar sala: "+err)
        req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar sua sala. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
        res.redirect("/user/home") // redireciona para a pagina
    }
});

router.post('/addResumo', async (req, res) => {
        try{
            var data = new Date()
            Individual.findOneAndUpdate({ responsavel: req.user._id }, {$push: { resumos: {titulo: req.body.titulo ,corpo: req.body.corpo, dateCreater: data} }}).then(() =>{
                console.log(req.user.name+ ", resumo cadastrado")
                req.flash("sucess_msg", req.user.name+ ", seu resumo foi cadastrado") // apresenta na tela a msg de salvo
                res.redirect("/tempo/resumos") //redireciona para a pagina
            }).catch((err) => {
                console.log("erro ao cadastrar resumo: ")
                req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar seu resumo. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
                res.redirect("/user/salaIndividual") // redireciona para a pagina
            })

        } catch(err){
            console.log("erro ao cadastrar resumo: "+err)
            req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar seu resumo. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/user/salaIndividual") // redireciona para a pagina
        }

    });

    router.post('/addNota', async (req, res) => {
        try{
            var data = new Date()
            Individual.findOneAndUpdate({ responsavel: req.user._id }, {$push: { notas: {corpo: req.body.corpo, dateCreater: data} }}).then(() =>{
                console.log(req.user.name+ ", nota cadastrado")
                req.flash("sucess_msg", req.user.name+ ", sua nota foi cadastrada") // apresenta na tela a msg de salvo
                res.redirect("/tempo/notas") //redireciona para a pagina
            }).catch((err) => {
                console.log("erro ao cadastrar resumo: ")
                req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar sua nota. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
                res.redirect("/user/salaIndividual") // redireciona para a pagina
            })
        } catch(err){
            console.log("erro ao cadastrar resumo: "+err)
            req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar sua nota. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/user/salaIndividual") // redireciona para a pagina
        }

    });

    router.post('/addMeta', async (req, res) => {
        try{
            var data = new Date()
            Individual.findOneAndUpdate({ responsavel: req.user._id }, {$push: { metas: {dateCreater: data, dataMeta: req.body.dataMeta, atividade: req.body.atividade} }}).then(() =>{
                console.log(req.user.name+ ", Meta cadastrada")
                req.flash("sucess_msg", req.user.name+ ", sua meta foi cadastrada") // apresenta na tela a msg de salvo
                res.redirect("/tempo/metas") //redireciona para a pagina
            }).catch((err) => {
                console.log("erro ao cadastrar resumo: ")
                req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar sua meta. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
                res.redirect("/user/salaIndividual") // redireciona para a pagina
            })
        } catch(err){
            console.log("erro ao cadastrar resumo: "+err)
            req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar sua meta. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/user/salaIndividual") // redireciona para a pagina
        }

    });

    
    router.post('/addFlashCards', async (req, res) => {
        try{
            var data = new Date()
           // console.log(id)

            Individual.findOneAndUpdate({ responsavel: req.user._id }, {$push: { flashcards: {dateCreater: data, assunto: req.body.assunto, pergunta: req.body.pergunta, resposta: req.body.resposta} }}).then(() =>{
                console.log(" Criou nova sala")
                req.flash("sucess_msg", "sala cadastrada") // apresenta na tela a msg de salvo
                res.redirect("/tempo/flashCards") //redireciona para a pagina
            }).catch((err) => {
                console.log(err)
            })
            console.log("adicionou uma flashCard")

        } catch(err){
            console.log("Deu erro ao adicionar membro: " + err)
        }

    });

    router.post('/removeResumo', async (req, res) => {
        try{
           Individual.findOneAndUpdate({ responsavel: req.user._id },{ $pull: { resumos: { _id: req.body.id } } }).then(() =>{
            console.log(req.user.name+ ", Resumo deletado")
            req.flash("sucess_msg", req.user.name+ ", seu resumo foi deletado") // apresenta na tela a msg de salvo
            res.redirect("/tempo/resumos") //redireciona para a pagina
           }).catch((err) => {
            console.log("erro ao deletar resumo: ")
            req.flash("error_msg",req.user.name + "Houve um erro ao deletar seu resumo. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/user/salaIndividual") // redireciona para a pagina
        })
        } catch(err){
            console.log("erro ao deletar resumo: "+err)
            req.flash("error_msg",req.user.name + "Houve um erro ao deletar seu resumo. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/user/salaIndividual") // redireciona para a pagina
        }

    });

    router.post('/removeNota', async (req, res) => {
        try{

           Individual.findOneAndUpdate({ responsavel: req.user._id },{ $pull: { notas: { _id: req.body.id } } }).then(() =>{
            console.log(req.user.name+ ", nota deletado")
            req.flash("sucess_msg", req.user.name+ ", sua nota foi deletada") // apresenta na tela a msg de salvo
            res.redirect("/tempo/notas") //redireciona para a pagina
           }).catch((err) => {
            console.log("erro ao deletar nota: "+err)
            req.flash("error_msg",req.user.name + "Houve um erro ao deletar sua nota. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/user/salaIndividual") // redireciona para a pagina
        })

        } catch(err){
            console.log("erro ao deletar nota: "+err)
            req.flash("error_msg",req.user.name + "Houve um erro ao deletar sua nota. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/user/salaIndividual") // redireciona para a pagina
        }

    });

    router.post('/removeMeta', async (req, res) => {
        try{
           Individual.findOneAndUpdate({ responsavel: req.user._id },{ $pull: { metas: { _id: req.body.id } } }).then(() =>{
            console.log(req.user.name+ ", meta deletado")
            req.flash("sucess_msg", req.user.name+ ", sua meta foi deletada") // apresenta na tela a msg de salvo
            res.redirect("/tempo/metas") //redireciona para a pagina
           }).catch((err) => {
            console.log("erro ao deletar meta: "+err)
            req.flash("error_msg",req.user.name + "Houve um erro ao deletar sua meta. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/user/salaIndividual") // redireciona para a pagina
        })
        } catch(err){
            console.log("erro ao deletar meta: "+err)
            req.flash("error_msg",req.user.name + "Houve um erro ao deletar sua meta. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/user/salaIndividual") // redireciona para a pagina
        }

    });

    
    router.post('/removeFlashCards', async (req, res) => {
        try{
            Individual.findOneAndUpdate({ responsavel: req.user._id },{ $pull: { flashcards: { _id: req.body.id } } }).then(() =>{}).catch((err) => {
                console.log(err)
            })

            console.log("removeu um flashCard")

        } catch(err){
            console.log("Deu erro ao adicionar membro: " + err)
        }

    });

module.exports = router