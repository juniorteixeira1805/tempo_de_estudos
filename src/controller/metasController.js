//--Importando os modulos--//
const express = require('express');

const Flashcards = require('../models/Flshcard');
const Metas = require('../models/Meta');


const Func = require('./tempoController')

const router = express.Router();

//-- rota responsavel pela persistencia da Meta no banco de dados --//
    router.post('/registerMeta', async (req, res) => {
    //--Criando Sala--//
        try{
        //-- criando objeto com os valores do body --//
            const novaIndividual = {
                responsavel: req.user._id,
                atividade: req.body.atividade,
                dataMeta: Func.FormatarData(req.body.dataMeta),
                privacidade: Boolean(req.body.privacidade=='true')
            }

        //-- persistindo no banco --//
            new Metas(novaIndividual).save().then( async () => {
                console.log(req.user.name+" Criou nova Meta")
                req.flash("sucess_msg", req.user.name+ ", sua meta foi cadastrada") // apresenta na tela a msg de salvo
                res.redirect("/meta/minhas-metas") //redireciona para a pagina
            }).catch((err) => {
                console.log("erro ao criar meta: "+err)
                req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar sua meta. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
                res.redirect("/meta/minhas-metas") // redireciona para a pagina
            })


        } catch(err) {
            console.log("erro ao criar meta: "+err)
            req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar sua meta. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/meta/minhas-metas") // redireciona para a pagina
        }
    });

//--Rota responsavel por deletar um resumo--//
    router.post('/deletarMeta', (req, res) =>{
        try{
            //--Deletando do banco os tempos do usuario que será deletado--//
            Metas.deleteOne({ _id: req.body.id }).then(async (req, res) => {
                console.log(req.user.name + " deletou uma meta")
                req.flash("sucess_msg", req.user.name + ", sua meta foi cadastrada")
                res.redirect('/meta/minhas-metas')
            }).catch((err) => {
                console.log(req.user.name + " Erro ao deletar a meta: " + err)
                req.flash("error_msg", "Houve um erro ao deletar uma meta")
                res.redirect('/meta/minhas-metas')
            })
        } catch(err){
            console.log(req.user.name + " Erro ao deletar a meta: " + err)
            req.flash("error_msg", "Houve um erro ao deletar uma meta")
            res.redirect('/meta/minhas-metas')
        }
    });

module.exports = router