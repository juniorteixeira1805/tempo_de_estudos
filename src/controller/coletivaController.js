const express = require('express');
const router = express.Router();
const Coletiva = require('../models/salaColetiva');
const User = require('../models/User');


//-- rota responsavel pela persistencia da sala no banco de dados --//
    router.post('/registerColetiva', async (req, res) => {
        //--Criando Sala--//
            try{
            //-- criando objeto com os valores do body --//
                const novaColetiva = {
                    responsavel: req.user._id, 
                    dateCreaterSala: new Date,
                    nomeSala: req.body.nomeSala,
                    participantes: {
                        participante: req.user._id, 
                        meta: req.body.meta
                    }
                }

            //-- persistindo no banco --//
                new Coletiva(novaColetiva).save().then( async () => {
                    console.log(req.user.name+" criou uma nova sala coletiva")
                    req.flash("sucess_msg", req.user.name+ ", sua sala foi cadastrada") // apresenta na tela a msg de salvo
                    res.redirect("/coletiva/minhas-salas-coletivas") //redireciona para a pagina
                }).catch((err) => {
                    console.log("erro ao cadastrar sala: " + err)
                    req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar sua sala. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
                    res.redirect("/coletiva/minhas-salas-coletivas") // redireciona para a pagina
                })
            } catch(err) {
                console.log("erro ao cadastrar sala: " + err)
               // req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar sua sala. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
                res.redirect("/coletiva/minhas-salas-coletivas") // redireciona para a pagina
            }
    });

//-- rota responsavel por persistir as informações no array flashcard --//
    router.post('/addTexto', async (req, res) => {
        try{
            Coletiva.findOneAndUpdate({ _id: req.body.id }, {$push: { feed: {dateCreater: new Date, participante: req.user._id, texto: req.body.texto} }}).then(() =>{
                res.redirect("/coletiva/minha-sala-coletiva") //redireciona para a pagina
            }).catch((err) => {
                console.log("erro ao cadastrar nota: ")
          //      req.flash("error_msg",req.user.name + "Houve um erro ao adicionar seu card. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
                res.redirect("/coletiva/minha-sala-coletiva") // redireciona para a pagina
            })
        } catch(err){
            console.log("erro ao cadastrar nota: "+err)
          //  req.flash("error_msg",req.user.name + "Houve um erro ao adicionar seu card. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/coletiva/minha-sala-coletiva") // redireciona para a pagina
        }
    });

    //-- rota responsavel por persistir as informações no array flashcard --//
    router.post('/addTextom', async (req, res) => {
        try{
            Coletiva.findOneAndUpdate({ _id: req.body.id }, {$push: { feed: {dateCreater: new Date, participante: req.user._id, texto: req.body.texto} }}).then(() =>{
                res.redirect("/coletiva/sala-coletiva/" + req.body.id) //redireciona para a pagina
            }).catch((err) => {
                console.log("erro ao cadastrar nota: ")
        //      req.flash("error_msg",req.user.name + "Houve um erro ao adicionar seu card. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
                res.redirect("/coletiva/sala-coletiva/" + req.body.id) // redireciona para a pagina
            })
        } catch(err){
            console.log("erro ao cadastrar nota: "+err)
        //  req.flash("error_msg",req.user.name + "Houve um erro ao adicionar seu card. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/coletiva/sala-coletiva/" + req.body.id) // redireciona para a pagina
        }
    });

//--Rota para deletar tempo do banco de dados--//
    router.post('/deletarTexto', async (req, res) =>{
        //-- removendo elemento --//
        try{
        Coletiva.findOneAndUpdate({ _id: '5f408c9d867758332cf3d5e0' },{ $pull: { feed: { _id: '5f408dde3d596b06241432d6' } } }).then( async() =>{

           // console.log(req.user.name+ ", deletou um tempo")
           // req.flash("sucess_msg", req.user.name+ ", seu tempo foi deletado.") // apresenta na tela a msg de salvo
            res.redirect("/perfis/meu-historico") //redireciona para a pagina
        }).catch((err) => {
           // console.log("erro ao deletar tempo: "+err)
           // req.flash("error_msg",req.user.name + "Houve um erro ao deletar seu tempo. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/perfis/meu-historico") // redireciona para a pagina

        })} catch(err){
          //  console.log("erro ao deletar meta: "+err)
           // req.flash("error_msg",req.user.name + "Houve um erro ao deletar seu tempo. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/perfis/meu-historico") // redireciona para a pagina
        }
    });

//-- rota responsavel por persistir as informações no array flashcard --//
    router.post('/addParticipante', async (req, res) => {
        try{
            var novoParticipante = await User.findOne({email: req.body.email})

            if(req.body.email == req.user.email){
                req.flash("error_msg", "Usuário já existente na sala.") // apresenta uma mensagem de erro
                res.redirect("/coletiva/minha-sala-coletiva") // redireciona para a pagina
            } else {
                if((novoParticipante != null) && (novoParticipante != undefined) && (novoParticipante != "")){
                    Coletiva.findOneAndUpdate({ _id: req.body.id }, {$push: { participantes: {participante: novoParticipante, meta: req.body.meta} }}).then(() =>{
                        User.findOneAndUpdate({_id: novoParticipante}, {$push: {coletivas: {coletiva: req.body.id}}}).then(() =>{console.log("deu certo ")}).catch((err) => {console.log("n deu certo "+ err)})
                        req.flash("sucess_msg", "Novo membro adicionado.") // apresenta na tela a msg de salvo
                        res.redirect("/coletiva/minha-sala-coletiva") //redireciona para a pagina
                    }).catch((err) => {
                        console.log("erro ao cadastrar nota: " + err)
                        req.flash("error_msg", "Houve um erro ao adicionar o membro. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
                        res.redirect("/coletiva/minha-sala-coletiva") // redireciona para a pagina
                    })
                } else {
                    req.flash("error_msg", "Usuário não encontrado.") // apresenta uma mensagem de erro
                    res.redirect("/coletiva/minha-sala-coletiva") // redireciona para a pagina
                }
            }

        } catch(err){
            console.log("erro ao adicionar membro: "+err)
        //  req.flash("error_msg",req.user.name + "Houve um erro ao adicionar seu card. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/coletiva/minha-sala-coletiva") // redireciona para a pagina
        }
    });

    //--Rota para deletar tempo do banco de dados--//
    router.post('/deletarParticipante', async (req, res) =>{
        //-- removendo elemento --//
        try{
        var minhaColetiva = await Coletiva.findOne({responsavel: req.user._id})
        Coletiva.findOneAndUpdate({ responsavel: req.user._id },{ $pull: { participantes: { participante: req.body.idUser } } }).then( async() =>{
            User.findOneAndUpdate({_id: req.body.idUser}, {$pull: {coletivas: {coletiva: minhaColetiva._id}}}).then(() =>{console.log("deu certo ")}).catch((err) => {console.log("n deu certo "+ err)})
            console.log('deletou um tempo')
        // req.flash("sucess_msg", req.user.name+ ", seu tempo foi deletado.") // apresenta na tela a msg de salvo
            res.redirect("/coletiva/minha-sala-coletiva") //redireciona para a pagina
        }).catch((err) => {
        // console.log("erro ao deletar tempo: "+err)
        // req.flash("error_msg",req.user.name + "Houve um erro ao deletar seu tempo. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/coletiva/minha-sala-coletiva") // redireciona para a pagina

        })} catch(err){
        //  console.log("erro ao deletar meta: "+err)
        // req.flash("error_msg",req.user.name + "Houve um erro ao deletar seu tempo. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/coletiva/minha-sala-coletiva") // redireciona para a pagina
        }
    });

    //--Rota para deletar tempo do banco de dados--//
    router.post('/sairdasala', async (req, res) =>{
        //-- removendo elemento --//
        try{
            console.log(req.body.id)
            Coletiva.findOneAndUpdate({ _id: req.body.id },{ $pull: { participantes: { participante: req.user._id } } }).then( async() =>{
            User.findOneAndUpdate({_id: req.user._id}, {$pull: {coletivas: {coletiva: req.body.id}}}).then(() =>{console.log("deu certo ")}).catch((err) => {console.log("n deu certo "+ err)})
        // req.flash("sucess_msg", req.user.name+ ", seu tempo foi deletado.") // apresenta na tela a msg de salvo
            res.redirect("/coletiva/minhas-salas-coletivas") //redireciona para a pagina
        }).catch((err) => {
        // console.log("erro ao deletar tempo: "+err)
        // req.flash("error_msg",req.user.name + "Houve um erro ao deletar seu tempo. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/coletiva/minhas-salas-coletivas") // redireciona para a pagina

        })} catch(err){
        //  console.log("erro ao deletar meta: "+err)
        // req.flash("error_msg",req.user.name + "Houve um erro ao deletar seu tempo. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/coletiva/minhas-salas-coletivas") // redireciona para a pagina
        }
    });
module.exports = router
