//--Importando os modulos--//
const express = require('express');

const Individual = require('../models/salaIndividual');
const Flashcards = require('../models/Flshcard');
const Resumos = require('../models/Resumo');
const Metas = require('../models/Meta');
const Tag = require('../models/Tag');
const User = require('../models/User');

const Func = require('./tempoController')

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

//-- rota responsavel pela persistencia ddo flashcard no banco de dados --//
    router.post('/registerflashCard', async (req, res) => {
    //--Criando Sala--//
        try{
        //-- criando objeto com os valores do body --//
            const novaIndividual = {
                responsavel: req.user._id,
                tag: req.body.tag,
                assunto: req.body.assunto,
                pergunta: req.body.pergunta,
                resposta: req.body.resposta,
                dateCreater: Func.novadata(new Date())
            }

        //-- persistindo no banco --//
            new Flashcards(novaIndividual).save().then( async () => {
                console.log(req.user.name+" Criou novo flashcard")
                req.flash("sucess_msg", req.user.name+ ", seu flashcard foi cadastrado") // apresenta na tela a msg de salvo
                res.redirect("/tempo/salaIndividual") //redireciona para a pagina
            }).catch((err) => {
                console.log("erro ao criar flashcard: "+err)
                req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar seu flashcard. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
                res.redirect("/user/salaIndividual") // redireciona para a pagina
            })


        } catch(err) {
            console.log("erro ao criar flashcard: "+err)
            req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar seu flashcard. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/user/salaIndividual") // redireciona para a pagina
        }
    });

//--Rota responsavel por deletar um resumo--//
    router.post('/deletarFlashcard', (req, res) =>{
        try{
            //--Deletando do banco os tempos do usuario que será deletado--//
            Flashcards.deleteOne({ _id: req.body.id }, function (err) { //procurando todas as collections que tem o id que vem do body (usuario) como estudante
                console.log(req.user.name + " deletou um flashcard")
                res.redirect('/user/salaIndividual')
                if (err) return handleError("Contate o suporte. Erro ao deletar o flashcard: " + err);
            });
        } catch(err){
            console.log(req.user.name + " Erro ao deletar o resumo: " + err)
            req.flash("error_msg", "Houve um erro ao deletar o flashcard")
            res.redirect('/user/salaIndividual')
        }
    });

//-- rota responsavel pela persistencia da Meta no banco de dados --//
    router.post('/registerMeta', async (req, res) => {
    //--Criando Sala--//
        try{
        //-- criando objeto com os valores do body --//
            const novaIndividual = {
                atividade: req.body.atividade,
                dataMeta: Func.FormatarData(req.body.dataMeta),
                dateCreater: Func.novadata(new Date())
            }

        //-- persistindo no banco --//
            new Metas(novaIndividual).save().then( async () => {
                console.log(req.user.name+" Criou nova Meta")
                req.flash("sucess_msg", req.user.name+ ", sua meta foi cadastrada") // apresenta na tela a msg de salvo
                res.redirect("/tempo/salaIndividual") //redireciona para a pagina
            }).catch((err) => {
                console.log("erro ao criar meta: "+err)
                req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar sua meta. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
                res.redirect("/user/salaIndividual") // redireciona para a pagina
            })


        } catch(err) {
            console.log("erro ao criar meta: "+err)
            req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar sua meta. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/user/salaIndividual") // redireciona para a pagina
        }
    });

//--Rota responsavel por deletar um resumo--//
    router.post('/deletarMeta', (req, res) =>{
        try{
            //--Deletando do banco os tempos do usuario que será deletado--//
            Flashcards.deleteOne({ _id: req.body.id }, function (err) { //procurando todas as collections que tem o id que vem do body (usuario) como estudante
                console.log(req.user.name + " deletou uma meta")
                res.redirect('/user/salaIndividual')
                if (err) return handleError("Contate o suporte. Erro ao deletar a meta: " + err);
            });
        } catch(err){
            console.log(req.user.name + " Erro ao deletar a meta: " + err)
            req.flash("error_msg", "Houve um erro ao deletar uma meta")
            res.redirect('/user/salaIndividual')
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

module.exports = router