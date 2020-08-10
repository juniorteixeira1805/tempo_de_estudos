//--Importando os modulos--//
const express = require('express');

const Resumos = require('../models/Resumo');
const Tag = require('../models/Tag');
const User = require('../models/User');

const Func = require('./tempoController')

const router = express.Router();

//-- rota responsavel pela persistencia do resumo no banco de dados --//
    router.post('/registerResumo', async (req, res) => {
    //--Criando Sala--//
        try{
        //-- criando objeto com os valores do body --//
            const novaIndividual = {
                responsavel: req.user._id,
                tag: req.body.tag,
                assunto: req.body.assunto,
                titulo: req.body.titulo,
                corpo: req.body.corpo,
                ref: req.body.ref,
                dateCreater: Func.novadata(new Date()),
                privacidade: (req.body.privacidade == "true")
            }

        //-- persistindo no banco --//
            new Resumos(novaIndividual).save().then( async () => {
            //-- Somando minutos ao dia --//
            console.log(req.body.privacidade == undefined)

            if(req.body.privacidade == undefined){
                minutosTotalNoDia = await 0 + parseInt(req.user.historico.dia)  
                minutosTotalNoSemana = await 0 + parseInt(req.user.historico.semana)
                minutosTotalNoMes = await 0 + parseInt(req.user.historico.mes)        
                minutosTotalNoTotal = await 0 + parseInt(req.user.historico.total)
            //--  somando minutos ao total --//
                totalEstudo = await 0 + parseInt(req.user.historico.totalEstudo)
                totalAula = await 0 + parseInt(req.user.historico.totalAula)
                totalLeitura = await 0 + parseInt(req.user.historico.totalLeitura)
                totalPesquisa = await 0 + parseInt(req.user.historico.totalPesquisa)
                totalExercicio = await 0 + parseInt(req.user.historico.totalExercicio)
                pontos = parseInt(req.user.historico.neutrinos) + 30
                await User.findOneAndUpdate({_id: req.user._id}, {$set: {historico: {dia: minutosTotalNoDia, semana: minutosTotalNoSemana, mes: minutosTotalNoMes, total: minutosTotalNoTotal, totalEstudo: totalEstudo, totalAula: totalAula, totalLeitura: totalLeitura, totalPesquisa: totalPesquisa, totalExercicio: totalExercicio, neutrinos: pontos}}}).then((req, res) => {}).catch((err) => {})
                await User.findOneAndUpdate({_id: req.user._id}, {$push: {meusEventos: {dateCreater: new Date(), evento: "Redigiu um novo resumo", name: req.user.name, foto: req.user.foto, subevento: req.body.titulo, metodo: "Escrita", inicio: "--:--", termino: "--:--", neutrinosGerado: 30}}}).then((req, res) => {}).catch((err) => {})
                let rsm = req.user.resumos + 1
                await User.findOneAndUpdate({_id: req.user._id}, {resumos: rsm}).then((req, res) => {}).catch((err) => {})

                console.log(req.user.name+" Criou um novo resumo")
                req.flash("sucess_msg", req.user.name+ ", seu resumo foi cadastrado") // apresenta na tela a msg de salvo
                res.redirect("/tempo/salaIndividual") //redireciona para a pagina
            } else {
                minutosTotalNoDia = await 0 + parseInt(req.user.historico.dia)  
                minutosTotalNoSemana = await 0 + parseInt(req.user.historico.semana)
                minutosTotalNoMes = await 0 + parseInt(req.user.historico.mes)        
                minutosTotalNoTotal = await 0 + parseInt(req.user.historico.total)
            //--  somando minutos ao total --//
                totalEstudo = await 0 + parseInt(req.user.historico.totalEstudo)
                totalAula = await 0 + parseInt(req.user.historico.totalAula)
                totalLeitura = await 0 + parseInt(req.user.historico.totalLeitura)
                totalPesquisa = await 0 + parseInt(req.user.historico.totalPesquisa)
                totalExercicio = await 0 + parseInt(req.user.historico.totalExercicio)
                pontos = req.user.historico.neutrinos + 0
                await User.findOneAndUpdate({_id: req.user._id}, {$set: {historico: {dia: minutosTotalNoDia, semana: minutosTotalNoSemana, mes: minutosTotalNoMes, total: minutosTotalNoTotal, totalEstudo: totalEstudo, totalAula: totalAula, totalLeitura: totalLeitura, totalPesquisa: totalPesquisa, totalExercicio: totalExercicio, neutrinos: pontos}}}).then((req, res) => {}).catch((err) => {})
                await User.findOneAndUpdate({_id: req.user._id}, {$push: {meusEventos: {dateCreater: new Date(), evento: "Redigiu um novo resumo", name: req.user.name, foto: req.user.foto, subevento: req.body.titulo, metodo: "Escrita", inicio: "--:--", termino: "--:--", neutrinosGerado: 30}}}).then((req, res) => {}).catch((err) => {})
                let rsm = req.user.resumos + 1
                await User.findOneAndUpdate({_id: req.user._id}, {resumos: rsm}).then((req, res) => {}).catch((err) => {})

                console.log(req.user.name+" Criou um novo resumo")
                req.flash("sucess_msg", req.user.name+ ", seu resumo foi cadastrado") // apresenta na tela a msg de salvo
                res.redirect("/tempo/salaIndividual") //redireciona para a pagina
            }

            }).catch((err) => {
                console.log("erro ao criar seu resumo: "+err)
                req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar seu resumo. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
                res.redirect("/user/salaIndividual") // redireciona para a pagina
            })


        } catch(err) {
            console.log("erro ao criar flashcard: "+err)
            req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar seu flashcard. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/user/salaIndividual") // redireciona para a pagina
        }
    });

//--Rota responsavel por deletar um resumo--//
    router.post('/deletarResumo', (req, res) =>{
        try{
            //--Deletando do banco os tempos do usuario que será deletado--//
            Resumos.deleteOne({ _id: req.body.id }).then( async (res, req) => { //procurando todas as collections que tem o id que vem do body (usuario) como estudante
            //-- Somando minutos ao dia --// 
                minutosTotalNoDia = await 0 + parseInt(req.user.historico.dia)  
                minutosTotalNoSemana = await 0 + parseInt(req.user.historico.semana)
                minutosTotalNoMes = await 0 + parseInt(req.user.historico.mes)        
                minutosTotalNoTotal = await 0 + parseInt(req.user.historico.total)
            //--  somando minutos ao total --//
                totalEstudo = await 0 + parseInt(req.user.historico.totalEstudo)
                totalAula = await 0 + parseInt(req.user.historico.totalAula)
                totalLeitura = await 0 + parseInt(req.user.historico.totalLeitura)
                totalPesquisa = await 0 + parseInt(req.user.historico.totalPesquisa)
                totalExercicio = await 0 + parseInt(req.user.historico.totalExercicio)
                pontos = req.user.historico.pts - 30
                await User.findOneAndUpdate({_id: req.user._id}, {$set: {historico: {dia: minutosTotalNoDia, semana: minutosTotalNoSemana, mes: minutosTotalNoMes, total: minutosTotalNoTotal, totalEstudo: totalEstudo, totalAula: totalAula, totalLeitura: totalLeitura, totalPesquisa: totalPesquisa, totalExercicio: totalExercicio, pts: pontos}}}).then((req, res) => {}).catch((err) => {})
                //-- verificando quantos eventos tem --//
                var eventos = await User.findOne({_id: req.user._id}).select('meusEventos')
                eventos = eventos.meusEventos
                var tam = eventos.length
                //-- se tiver mais que 4 eventos o ultimo evento será removido  --//
                if(tam > 4){
                    await User.findOneAndUpdate({_id: req.user._id}, { $pop: { "meusEventos" : -1 } }).then((req, res) => {console.log("deu certo")}).catch((err) => {console.log(err)})
                }
                await User.findOneAndUpdate({ _id: req.user._id },{ $pull: { meusEventos: { _id: req.body.id }}}).then((req, res) => {}).catch((err) => {})
                let rsm = req.user.resumos - 1
                await User.findOneAndUpdate({_id: req.user._id}, {resumos: rsm}).then((req, res) => {}).catch((err) => {})

                console.log(req.user.name + " deletou um resumo")
                res.redirect('/resumo/meus-resumos')
            }).catch((err) => {
                console.log(req.user.name + " Erro ao deletar o resumo: " + err)
                req.flash("error_msg", "Houve um erro ao deletar o resumo")
                res.redirect('//resumo/meus-resumos')
            })
        } catch(err){
            console.log(req.user.name + " Erro ao deletar o resumo: " + err)
            req.flash("error_msg", "Houve um erro ao deletar o resumo")
            res.redirect('/tempo/salaIndividual')
        }
    });

//-- rota responsavel pela persistencia da Meta no banco de dados --//
    router.post('/registerTag', async (req, res) => {
    //--Criando Sala--//
        try{
        //-- criando objeto com os valores do body --//
            const novaIndividual = {
                tags: req.body.tag,
            }

        //-- persistindo no banco --//
            new Tag(novaIndividual).save().then( async () => {
                console.log(" Criou nova tag")
                res.send('<div class="container text-center"><h3>Sua tag foi cadastrada. Para utilizar a nova tag, você terá que recarregar a página de edição, mas antes, copie o que escreveu, pois quando sua pagina recarregar, você perderá o que foi escrito Pode fechar essa aba. :D</h3></div>') //redireciona para a pagina
            }).catch((err) => {
                console.log("erro ao criar tag: "+err)
                res.send('<div class="container text-center"><h3>Essa Tag já existe, verifique novamente.</h3></div>') // redireciona para a pagina
            })


        } catch(err) {
            console.log("erro ao criar tag: "+err)
            req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar sua meta. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/user/salaIndividual") // redireciona para a pagina
        }
    });

module.exports = router