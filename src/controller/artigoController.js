//--Importando os modulos--//
const express = require('express');

const Artigo = require('../models/Artigo');

const router = express.Router();

const enviarEmail = require('../config/nodemailer')

//-- rota que recebe informações para criar um novo artigo--//
    router.post('/registerArtigo', async (req, res) => {
    //--Criando novo artigo--//
        try{
            const novoArtigo = { //-- Criando novo objeto --//
                grandeArea: req.body.grandeArea, 
                area: req.body.area,
                tema: req.body.tema,
                descricao: req.body.descricao,
                linkDoArtigo: req.body.linkDoArtigo,
                referencias: req.body.referencias,
                autor: req.user,
                dateCreater: Date.now()
            }

            //-- persistindo o objeto artigo no banco de dados --//
            new Artigo(novoArtigo).save().then( async () => {
                console.log(req.user.name + " Acresentou novo artigo")
                enviarEmail.sendInfo(req.user.email, "Novo artigo cadastrado. "+"area: "+req.body.area)
                req.flash("sucess_msg", "Artigo cadastrado") // apresenta na tela a msg de salvo
                res.redirect("/artigo/meusArtigos") //redireciona para a pagina
            }).catch((err) => {
                console.log(err)
                req.flash("error_msg", "Houve um erro ao cadastrar" + err) // apresenta uma mensagem de erro
                res.redirect("/artigo/meusArtigos") // redireciona para a pagina
            })


        } catch(err) {
            req.flash("error_msg", "Erro ao cadastrar artigo.")
            res.redirect("/")
            console.log("Deu erro ao tentar cadastrar novo artigo: ", err)
        }
    });

//-- Rota responsavel por editar um artigo ja cadastrado --//
    router.post("/editArtigo", async (req, res) => {
    //-- Atualizando o bd User com os dados recebidos --//
        try{
            await Artigo.updateOne({_id: req.body.id}, {grandeArea: req.body.grandeArea}, function(err, res) {
            });
            await Artigo.updateOne({_id: req.body.id},{area: req.body.area}, function(err, res) {
            });
            await Artigo.updateOne({_id: req.body.id}, {tema: req.body.tema}, function(err, res) {
            });
            await Artigo.updateOne({_id: req.body.id}, {descricao: req.body.descricao}, function(err, res) {
            });
            await Artigo.updateOne({_id: req.body.id}, {linkDoArtigo: req.body.linkDoArtigo}, function(err, res) {
            });
            await Artigo.updateOne({_id: req.body.id}, {referencias: req.body.referencias}, function(err, res) {
            });
            console.log(req.user.name + " Editou o artigo")
            req.flash("sucess_msg", "artigo editado")
            res.redirect("/artigo/meusArtigos")
        } catch(err){
            console.log("Deu erro ao editar o perfil "+ req.user.name + err)
        }

    });

//-- rota responsavel por deletar um artigo ja existente --//
    router.post('/deletarArtigo', (req, res) =>{
        try{
            //--Deletando do banco os tempos do usuario que será deletado--//
            Artigo.deleteOne({ _id: req.body.id }, function (err) { //procurando todas as collections que tem o id que vem do body (usuario) como estudante
                console.log(req.user.name + " deletou um artigo")
                req.flash("sucess_msg", "Artigo deletado")
                res.redirect('/artigo/meusArtigos')
                enviarEmail.sendInfo(req.user.email, "Você deletou um artigo.")
                if (err) return handleError("Contate o suporte. Erro ao deletar os tempos: " + err);
            });
        } catch(err){
            console.log("erro ao deletar artigo:" + err)
            req.flash("error_msg", "Erro ao deletar artigo.")
            res.redirect('/artigo/meusArtigos')
        }

});

module.exports = router