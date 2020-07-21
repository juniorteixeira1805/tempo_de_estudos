//--Importando os modulos--//
const express = require('express');

const Individual = require('../models/salaIndividual');

const router = express.Router();

//-- rota responsavel pela persistencia da sala no banco de dados --//
    router.post('/registerIndividual', async (req, res) => {
    //--Criando Sala--//
        try{
        //-- criando objeto com os valores do body --//
            const novaIndividual = {
                responsavel: req.user.id,
                dateCreaterSala: Date.now(),
                nomeSala: req.body.nomeSala,
            }

        //-- persistindo no banco --//
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

//-- rota responsavel por addicionar persistir as informações no array resumo --//
    router.post('/addResumo', async (req, res) => {
    //-- adicionando novo resumo --//
        try{
            var data = new Date()
        //-- adidiconando um novo elemento ao array --//
            Individual.findOneAndUpdate({ responsavel: req.user._id }, {$push: { resumos: {titulo: req.body.titulo ,corpo: req.body.corpo, dateCreater: data} }}).then(() =>{
                console.log(req.user.name+ ", resumo cadastrado")
                req.flash("sucess_msg", req.user.name+ ", seu resumo foi cadastrado") // apresenta na tela a msg de salvo
                res.redirect("/tempo/resumos") //redireciona para a pagina
            }).catch((err) => {
                console.log("erro ao cadastrar resumo: " + err)
                req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar seu resumo. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
                res.redirect("/user/salaIndividual") // redireciona para a pagina
            })

        } catch(err){
            console.log("erro ao cadastrar resumo: "+err)
            req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar seu resumo. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/user/salaIndividual") // redireciona para a pagina
        }
    });

//-- rota responsavel por addicionar persistir as informações no array nota --//
    router.post('/addNota', async (req, res) => {
        try{
            var data = new Date()
        //-- adidiconando um novo elemento ao array --//
            Individual.findOneAndUpdate({ responsavel: req.user._id }, {$push: { notas: {corpo: req.body.corpo, dateCreater: data} }}).then(() =>{
                console.log(req.user.name+ ", nota cadastrada")
                req.flash("sucess_msg", req.user.name+ ", sua nota foi cadastrada") // apresenta na tela a msg de salvo
                res.redirect("/tempo/notas") //redireciona para a pagina
            }).catch((err) => {
                console.log("erro ao cadastrar nota: ")
                req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar sua nota. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
                res.redirect("/user/salaIndividual") // redireciona para a pagina
            })
        } catch(err){
            console.log("erro ao cadastrar nota: "+err)
            req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar sua nota. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/user/salaIndividual") // redireciona para a pagina
        }
    });

//-- rota responsavel por addicionar persistir as informações no array Meta --//
    router.post('/addMeta', async (req, res) => {
        try{
            var data = new Date()
        //-- adidiconando um novo elemento ao array --//
            Individual.findOneAndUpdate({ responsavel: req.user._id }, {$push: { metas: {dateCreater: data, dataMeta: req.body.dataMeta, atividade: req.body.atividade} }}).then(() =>{
                console.log(req.user.name+ ", Meta cadastrada")
                req.flash("sucess_msg", req.user.name+ ", sua meta foi cadastrada") // apresenta na tela a msg de salvo
                res.redirect("/tempo/metas") //redireciona para a pagina
            }).catch((err) => {
                console.log("erro ao cadastrar meta: ")
                req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar sua meta. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
                res.redirect("/user/salaIndividual") // redireciona para a pagina
            })
        } catch(err){
            console.log("erro ao cadastrar meta: "+err)
            req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar sua meta. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/user/salaIndividual") // redireciona para a pagina
        }
    });

//-- rota responsavel por addicionar persistir as informações no array flashcards --//
    router.post('/addFlashCards', async (req, res) => {
        try{
            var data = new Date()
        ///-- adidiconando um novo elemento ao array --// 
            Individual.findOneAndUpdate({ responsavel: req.user._id }, {$push: { flashcards: {dateCreater: data, assunto: req.body.assunto, pergunta: req.body.pergunta, resposta: req.body.resposta} }}).then(() =>{
                console.log(req.user.name+ ", flashcard cadastrado")
                req.flash("sucess_msg", req.user.name+ ", seu flashcard foi cadastrado") // apresenta na tela a msg de salvo
                res.redirect("/tempo/flashcards") //redireciona para a pagina
            }).catch((err) => {
                console.log("erro ao cadastrar flashcard: ")
                req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar seu flashcard. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
                res.redirect("/user/flashcards")
            })
        } catch(err){
            console.log("erro ao cadastrar um flashcard: "+err)
            req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar flashcard. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/user/flashcards")
        }
    });

//-- rota responsavel por remover um elemento do array resumo --//
    router.post('/removeResumo', async (req, res) => {
    //-- removendo resumo --//
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

//-- rota responsavel por remover um elemento do array NOta --//
    router.post('/removeNota', async (req, res) => {
    //-- removendo nelemento --//
        try{
           Individual.findOneAndUpdate({ responsavel: req.user._id },{ $pull: { notas: { _id: req.body.id } } }).then(() =>{
            console.log(req.user.name+ ", deletou uma nota")
            req.flash("sucess_msg", req.user.name+ ", sua nota foi deletada") // apresenta na tela a msg de salvo
            res.redirect("/tempo/notas") //redireciona para a pagina
           }).catch((err) => {
            console.log("erro ao deletar nota: "+err)
            req.flash("error_msg",req.user.name + "Houve um erro ao deletar sua nota. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/user/salaIndividual") // redireciona para a pagina

        })} catch(err){
            console.log("erro ao deletar nota: "+err)
            req.flash("error_msg",req.user.name + "Houve um erro ao deletar sua nota. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/user/salaIndividual") // redireciona para a pagina
        }
    });

//-- rota responsavel por remover um elemento do array Meta --//
    router.post('/removeMeta', async (req, res) => {
    //-- removendo elemento --//
        try{
           Individual.findOneAndUpdate({ responsavel: req.user._id },{ $pull: { metas: { _id: req.body.id } } }).then(() =>{
            console.log(req.user.name+ ", deletou uma meta")
            req.flash("sucess_msg", req.user.name+ ", sua meta foi deletada") // apresenta na tela a msg de salvo
            res.redirect("/tempo/metas") //redireciona para a pagina
           }).catch((err) => {
            console.log("erro ao deletar meta: "+err)
            req.flash("error_msg",req.user.name + "Houve um erro ao deletar sua meta. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/user/salaIndividual") // redireciona para a pagina

        })} catch(err){
            console.log("erro ao deletar meta: "+err)
            req.flash("error_msg",req.user.name + "Houve um erro ao deletar sua meta. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/user/salaIndividual") // redireciona para a pagina
        }
    });

    
    router.post('/removeFlashCards', async (req, res) => {
        try{
            Individual.findOneAndUpdate({ responsavel: req.user._id },{ $pull: { flashcards: { _id: req.body.id } } }).then(() =>{
                console.log(req.user.name+ ", deletou um flashcard")
                req.flash("sucess_msg", req.user.name+ ", seu flashcard foi deletado") // apresenta na tela a msg de salvo
                res.redirect("/tempo/flashcard") //redireciona para a pagina
            }).catch((err) => {
                console.log("erro ao deletar flashcard: "+err)
                req.flash("error_msg",req.user.name + "Houve um erro ao deletar sue flashcard. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
                res.redirect("/user/flashcard") // redireciona para a pagina
            })
        } catch(err){
            console.log("erro ao deletar flashcard: "+err)
            req.flash("error_msg",req.user.name + "Houve um erro ao deletar sue flashcard. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/user/flashcard") // redireciona para a pagina
        }
    });

module.exports = router