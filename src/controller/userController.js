//-- Importações --//
    const express = require('express');

    const Tempo = require('../models/Tempo');

    const User = require('../models/User');

    const router = express.Router();

    const {eAdmin} = require("../helpers/eAdmin")

    const funcdata = require("../controller/tempoController")

    const Atividade = require('../models/Atividade')

    const enviarEmail = require('../config/nodemailer')

    const bct = require('bcryptjs');


    //-- Tratando data e setando nova data --//

        
//-- Rota que registra novo tempo e adiciona novo tempo ao bd no dia, semana, mes e total do usuario --//
    router.post('/registerTempo', async (req, res) => {
        try{
            function FormatarData(data) {
                var ano  = data.split("-")[0];
                  var mes  = data.split("-")[1];
                  var dia  = data.split("-")[2];
              
                return dia + '/' + ("0"+mes).slice(-2) + '/' + (ano)
                // Utiliza o .slice(-2) para garantir o formato com 2 digitos.
              }

              console.log(req.body.novaData)
            var nova_Data = await FormatarData(req.body.novaData)
    
            const novoTempo = { //-- Recebendo valores --//
                novaData: nova_Data, 
                inicio: req.body.inicio, 
                termino: req.body.termino, 
                estudante: req.body.id,
                tipo: req.body.tipo,
                dateCreater: new Date(),
                subTipo: req.body.subTipo,
            }

        //-- Somando minutos ao dia --//
            minutosNoDia = funcdata.tempoEstudado(req.body.inicio, req.body.termino)
            minutosTotalNoDia = parseInt(minutosNoDia) + parseInt(req.body.dia)        
            await User.updateOne({_id: req.body.id}, {dia: minutosTotalNoDia}, function(err, res) {
            });

        //-- Somando minutos a semana --//
            minutosTotalNoSemana = minutosNoDia + parseInt(req.body.semana)        
            await User.updateOne({_id: req.body.id}, {semana: minutosTotalNoSemana}, function(err, res) {
            });

        //-- Somando minutos so mes --//
            minutosTotalNoMes = minutosNoDia + parseInt(req.body.mes)        
            await User.updateOne({_id: req.body.id}, {mes: minutosTotalNoMes}, function(err, res) {
            });

        //--  somando minutos ao total --//
            minutosTotalNoTotal = minutosNoDia + parseInt(req.body.total)        
            await User.updateOne({_id: req.body.id}, {total: minutosTotalNoTotal}, function(err, res) {
            });

        //-- Criando a collection --//
            new Tempo(novoTempo).save().then( async () => {
                console.log(req.user.name + " Acresentou novo tempo")
                req.flash("sucess_msg", req.user.name+", Seu tempo foi salvo.") // apresenta na tela a msg de salvo
                res.redirect("/user/home") //redireciona para a pagina
            }).catch((err) => {
                console.log(err)
                req.flash("error_msg", "Houve um erro ao salvar") // apresenta uma mensagem de erro
                res.redirect("/user/home") // redireciona para a pagina
            })


        }
        
        catch(err) {
            console.log("Deu erro: ", err)
        }
    })

    router.post('/registerTempoPomodoro', async (req, res) => {
        try{

            const data = new Date(); //-- Extraindo a data de hoje --//    
            const novoTempo = { //-- Recebendo valores --//
                novaData: req.body.novaData, 
                inicio: req.body.inicio, 
                termino: req.body.termino, 
                estudante: req.body.id,
                tipo: req.body.tipo,
                dateCreater: data,
                subTipo: req.body.subTipo,
            }

        //-- Somando minutos ao dia --//
            minutosNoDia = funcdata.tempoEstudado(req.body.inicio, req.body.termino)
            minutosTotalNoDia = parseInt(minutosNoDia) + parseInt(req.body.dia)        
            await User.updateOne({_id: req.body.id}, {dia: minutosTotalNoDia}, function(err, res) {
            });

        //-- Somando minutos a semana --//
            minutosTotalNoSemana = minutosNoDia + parseInt(req.body.semana)        
            await User.updateOne({_id: req.body.id}, {semana: minutosTotalNoSemana}, function(err, res) {
            });

        //-- Somando minutos so mes --//
            minutosTotalNoMes = minutosNoDia + parseInt(req.body.mes)        
            await User.updateOne({_id: req.body.id}, {mes: minutosTotalNoMes}, function(err, res) {
            });

        //--  somando minutos ao total --//
            minutosTotalNoTotal = minutosNoDia + parseInt(req.body.total)        
            await User.updateOne({_id: req.body.id}, {total: minutosTotalNoTotal}, function(err, res) {
            });

        //-- Criando a collection --//
            new Tempo(novoTempo).save().then( async () => {
                console.log(req.user.name + " Acresentou novo tempo")
                req.flash("sucess_msg", req.user.name+"tempo salvo com sucesso") // apresenta na tela a msg de salvo
                res.redirect("/user/home") //redireciona para a pagina
            }).catch((err) => {
                console.log(err)
                req.flash("error_msg", "Houve um erro ao salvar seu tempo") // apresenta uma mensagem de erro
                res.redirect("/user/home") // redireciona para a pagina
            })


        }
        
        catch(err) {
            console.log("Deu erro: ", err)
        }
    })

    router.post('/enviarEmail', async (req, res) => {
        try{
            enviarEmail.suporte(req.user.name, req.body.assunto, req.body.texto, req.user.email)
            req.flash("sucess_msg", "Seu email foi enviado. Analisaremos o conteúdo e responderemos em até 3 dias.")
            res.redirect('/user/suporte')
        }catch(err){
            req.flash("error_msg", "Houve um erro ao enviar")
            res.redirect('/user/suporte')
        }
    })

    router.post('/enviaCodigo', async (req, res) => {
        try{

            function makeid() {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()_+={}?/][";
                
                for (var i = 0; i < 10; i++)
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                
                return text;
                }
                

            var x = await User.findOne({email: req.body.email}, {email: req.body.email})

            if(x.email == req.body.email){
                var text =  makeid()
                const hash = await bct.hash(text, 5);
                await enviarEmail.SendSenha(req.body.email, text)
                await User.updateOne({email: req.body.email}, {password: hash}, function(err, res) {
                });
                req.flash("sucess_msg", "Enviamos um código para seu E-mail")
                res.redirect('/')
            }else{
                await enviarEmail.SendSenha(req.body.email, "Esse Email não possui cadastro. Faça seu cadastro e venha para a Improdutiva Estudos LTDA")
                req.flash("error_msg", "Esse E-mail não possui cadastro.")
                res.redirect('/')
            }


        }catch(err){
            console.log("Erro ao mandar codigo para mudar senha: ", err)
            req.flash("error_msg", "Houve um erro ao enviar o codigo")
            res.redirect('/')
        }
    })




//-- Rota que registra novo tempo e adiciona novo tempo ao bd no dia, semana, mes e total do usuario --//
    router.post('/registerAtividade', async (req, res) => {
        try{        
            const novoTempo = { //-- Recebendo valores --//
                status: false,
                estudante: req.user._id, 
                horarioInicial: req.body.horarioInicial, 
                horarioTermino: req.body.horarioTermino,
                atividade: req.body.atividade,
                dia: req.body.dia,
            }

        //-- Criando a collection --//
            new Atividade(novoTempo).save().then( async () => {
                console.log(req.user.name + " Acresentou novo atividade ao Cronograma")
                req.flash("sucess_msg", "atividade salvo com sucesso") // apresenta na tela a msg de salvo
                res.redirect("/user/perfil") //redireciona para a pagina
            }).catch((err) => {
                console.log(err)
                req.flash("error_msg", "Houve um erro ao salvar") // apresenta uma mensagem de erro
                res.redirect("/user/perfil") // redireciona para a pagina
            })
        }
        catch(err) {
            console.log("Deu erro: ", err)
        }
    })

    router.post('/concluiratividade', (req, res) =>{
        try{
            Atividade.updateOne({_id: req.body.id}, {status: true}, function(err, res) {
                console.log("Atividade concluída")
            });
            req.flash("sucess_msg", "Atividade concluída")
            res.redirect('/user/home')
        }catch(err){
            req.flash("error_msg", "Houve um erro ao concluir atividade")
            res.redirect('/user/home')
            console.log("Erro ao concluir atividade: " + err)
        }

    })

//--Rota para deletar usuarios do banco de dados--//
    router.post('/deletarAtividade', (req, res) =>{

        try{
            //--Deletando do banco os tempos do usuario que será deletado--//
            Atividade.deleteOne({ _id: req.body.id }, function (err) { //procurando todas as collections que tem o id que vem do body (usuario) como estudante
                console.log(req.user.name + " deletou os tempos")
                res.redirect('/user/perfil')
                if (err) return handleError("Contate o suporte. Erro ao deletar os tempos: " + err);
            });
        } catch(err){
            console.log("erro:" + err)
            res.redirect('/user/perfil')
        }

    });

//--Rota para deletar usuarios do banco de dados--//
    router.post('/deletarTempo', async (req, res) =>{

        try{

                //-- diminuindo minutos ao dia --//
                var dia = parseInt(req.body.dia) - parseInt(req.body.tempoEstudado)
                User.updateOne({_id: req.body.usuario_id}, {dia: dia}, function(err, res) {
                });

                //-- diminuindo minutos a semana --//
                var semana = parseInt(req.body.semana) - parseInt(req.body.tempoEstudado)       
                User.updateOne({_id: req.body.usuario_id}, {semana: semana}, function(err, res) {
                });

                //-- diminuindo minutos so mes --//
                var mes = parseInt(req.body.mes) - parseInt(req.body.tempoEstudado)       
                User.updateOne({_id: req.body.usuario_id}, {mes: mes}, function(err, res) {
                });

                //--  diminuindo minutos ao total --//
                var total = parseInt(req.body.total) - parseInt(req.body.tempoEstudado)        
                User.updateOne({_id: req.body.usuario_id}, {total: total}, function(err, res) {
                });
               
                //--Deletando do banco os tempos do usuario que será deletado--//                
                Tempo.deleteOne({_id: req.body.tempo_id}).then(() => { //--Procurando a collection que tem o id que vem do body (usuario)--//
                    console.log(req.user.name + " deletou seu tempo")
                    req.flash("success_msg", "Tempo deletada.")
                    res.redirect("/user/home")
                    console.log(req.user.name + " deletou o tempo")
                }).catch((err) => {
                    req.flash("error_msg", "erro ao deletar a conta. Contate-nos.")
                    res.redirect("/user/perfil")
                    console.log(err)
                });


        } catch(err){
            console.log("erro ao deletar os tempos do banco de: " + req.user.name + err)
        }

    });

//-- Rota para registrar recado --//
    router.post('/registerRecado', async (req, res) => {
        try{        
            //-- Atualizando recado --//
            await User.updateOne({_id: req.body.id}, {recado: req.body.recado}, function(err, res) {

            });
            console.log(req.user.name + " Registrou recado")
            req.flash("sucess_msg", "Seu recado foi salvo.") // apresenta na tela a msg de salvo
            res.redirect("/user/home") //redireciona para a pagina

        }
        
        catch(err) {
            req.flash("error_msg", "Houve um erro ao salvar") // apresenta uma mensagem de erro
            res.redirect("/user/home")
            console.log("Deu erro: ", err)
        }
    })

//-- Rota para editar perfil --//
    router.post("/editPerfil", eAdmin, async (req, res) => {
        
    //-- Atualizando o bd User com os dados recebidos --//
        try{
            await User.updateOne({_id: req.body.id}, {name: req.body.name}, function(err, res) {
            });
            await User.updateOne({_id: req.body.id},{curso: req.body.curso}, function(err, res) {
            });
            await User.updateOne({_id: req.body.id}, {foto: req.body.foto}, function(err, res) {
            });
            await User.updateOne({_id: req.body.id}, {email: req.body.email}, function(err, res) {
            });
            var senha = await bct.hash(req.body.password, 5);
            console.log(senha)
            await User.updateOne({_id: req.body.id}, {password: senha}, function(err, res) {
            });
            console.log(req.user.name + " Editou o perfil")
            req.flash("sucess_msg", "Perfil editado")
            res.redirect("/user/home")
        } catch(err){
            console.log("Deu erro ao editar o perfil "+ req.user.name + err)
        }

    })

//-- Rota para mudar a privacidade --//
    router.post('/privacidade', async (req, res) => {
        try {
        //-- Verificando qual o status de privacidade do usuario --//
            if(req.user.privacidade){
                //-- se verdadeiro muda para false --//
                await User.updateOne({_id: req.user._id}, {privacidade: false}, function(err, res) {
                });
            }
            else{
                //-- se não muda para true --//
                await User.updateOne({_id: req.user._id}, {privacidade: true}, function(err, res) {
                });
            }

            console.log(req.user.name + " mudou a privacidade para: " + req.user.privacidade)
            req.flash("sucess_msg", "você mudou a privacidade")
            res.redirect("/user/home")
            
        } catch(err) {
            console.log("Deu erro: " + err)
            req.flash("sucess_msg", "você mudou a privacidade")
            res.redirect("/user/home")
        }


    })

module.exports = router
