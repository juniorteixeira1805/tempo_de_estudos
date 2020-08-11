//-- Importando modulos --//
    const express = require('express');
    const router = express.Router();
    const User = require('../models/User');
    const Atividade = require('../models/Atividade')
    const funcdata = require("../controller/tempoController")
    const enviarEmail = require('../config/nodemailer')
    const bct = require('bcryptjs');
        
//-- Rota que registra novo tempo pelo metodo aberto --//
    router.post('/registerTempo', async (req, res) => {
        try{
        //-- transformando a data do formato americano para o formato Brasileiro --//
            var nova_Data = await funcdata.FormatarData(req.body.novaData)

        //-- Calculando a quantidade de minutos estudados --//
            tempoTotalEstudado = await funcdata.tempoEstudado(req.body.inicio, req.body.termino)

        //-- persistindo no banco de dados --//
            await User.findOneAndUpdate({ _id: req.user._id }, {$push: { tempos: {dateCreater: new Date(), novaData: nova_Data, inicio: req.body.inicio, termino: req.body.termino, tempoEstudado: tempoTotalEstudado, tipo: req.body.tipo, subTipo: req.body.subTipo, metodo: "Aberto"} }}).then(async () =>{

            //-- Somando minutos ao dia --// 
                minutosTotalNoDia = await parseFloat(tempoTotalEstudado) + parseFloat(req.user.historico.dia)  
                minutosTotalNoSemana = await tempoTotalEstudado + parseFloat(req.user.historico.semana)
                minutosTotalNoMes = await tempoTotalEstudado + parseFloat(req.user.historico.mes)        
                minutosTotalNoTotal = await tempoTotalEstudado + parseFloat(req.user.historico.total)

            //-- verificando quantos eventos tem --//
                var eventos = await User.findOne({_id: req.user._id}).select('meusEventos')
                eventos = eventos.meusEventos
                var tam = eventos.length
                //-- se tiver mais que 4 eventos o ultimo evento será removido  --//
                if(tam > 4){
                    await User.findOneAndUpdate({_id: req.user._id}, { $pop: { "meusEventos" : -1 } }).then((req, res) => {console.log("deu certo")}).catch((err) => {console.log(err)})
                }

                if(req.body.tipo == "Estudou"){
                //--  somando minutos ao total --//
                totalEstudo = await tempoTotalEstudado + parseFloat(req.user.historico.totalEstudo)
                totalAula = await 0 + parseFloat(req.user.historico.totalAula)
                totalLeitura = await 0 + parseFloat(req.user.historico.totalLeitura)
                totalPesquisa = await 0 + parseFloat(req.user.historico.totalPesquisa)
                totalExercicio = await 0 + parseFloat(req.user.historico.totalExercicio)
                pontos = parseFloat((req.user.historico.neutrinos).toFixed(2)) + parseFloat(((tempoTotalEstudado)/10).toFixed(2))
                await User.findOneAndUpdate({_id: req.user._id}, {$set: {historico: {dia: minutosTotalNoDia, semana: minutosTotalNoSemana, mes: minutosTotalNoMes, total: minutosTotalNoTotal, totalEstudo: totalEstudo, totalAula: totalAula, totalLeitura: totalLeitura, totalPesquisa: totalPesquisa, totalExercicio: totalExercicio, neutrinos: pontos}}}).then((req, res) => {}).catch((err) => {})
                
                await User.findOneAndUpdate({_id: req.user._id}, {$push: {meusEventos: {dateCreater: new Date(),name: req.user.name, foto: req.user.foto, evento: req.body.tipo, subevento: req.body.subTipo, metodo: "Aberto", inicio: req.body.inicio, termino: req.body.termino, neutrinosGerado: (parseFloat(tempoTotalEstudado)/10).toFixed(2)}}}).then((req, res) => {console.log("deu certo")}).catch((err) => {console.log(err)})
                } else{
                    if(req.body.tipo == "Assistiu aula"){
                        //--  somando minutos ao total --//
                        totalEstudo = await 0 + parseFloat(req.user.historico.totalEstudo)
                        totalAula = await tempoTotalEstudado + parseFloat(req.user.historico.totalAula)
                        totalLeitura = await 0 + parseFloat(req.user.historico.totalLeitura)
                        totalPesquisa = await 0 + parseFloat(req.user.historico.totalPesquisa)
                        totalExercicio = await 0 + parseFloat(req.user.historico.totalExercicio)
                        pontos = parseFloat((req.user.historico.neutrinos).toFixed(2)) + parseFloat((((tempoTotalEstudado)/10).toFixed(2)))
                        await User.findOneAndUpdate({_id: req.user._id}, {$set: {historico: {dia: minutosTotalNoDia, semana: minutosTotalNoSemana, mes: minutosTotalNoMes, total: minutosTotalNoTotal, totalEstudo: totalEstudo, totalAula: totalAula, totalLeitura: totalLeitura, totalPesquisa: totalPesquisa, totalExercicio: totalExercicio, neutrinos: pontos}}}).then((req, res) => {}).catch((err) => {})
                        await User.findOneAndUpdate({_id: req.user._id}, {$push: {meusEventos: {dateCreater: new Date(),name: req.user.name, foto: req.user.foto, evento: req.body.tipo, subevento: req.body.subTipo, metodo: "Aberto", inicio: req.body.inicio, termino: req.body.termino, neutrinosGerado: (parseFloat(tempoTotalEstudado)/10).toFixed(2)}}}).then((req, res) => {console.log("deu certo")}).catch((err) => {console.log(err)})                    } else{
                        if(req.body.tipo == "Leitura"){
                            //--  somando minutos ao total --//
                            totalEstudo = await 0 + parseFloat(req.user.historico.totalEstudo)
                            totalAula = await 0 + parseFloat(req.user.historico.totalAula)
                            totalLeitura = await tempoTotalEstudado + parseFloat(req.user.historico.totalLeitura)
                            totalPesquisa = await 0 + parseFloat(req.user.historico.totalPesquisa)
                            totalExercicio = await 0 + parseFloat(req.user.historico.totalExercicio)
                            pontos = parseFloat((req.user.historico.neutrinos).toFixed(2)) + parseFloat(((tempoTotalEstudado)/6).toFixed(2))
                            await User.findOneAndUpdate({_id: req.user._id}, {$set: {historico: {dia: minutosTotalNoDia, semana: minutosTotalNoSemana, mes: minutosTotalNoMes, total: minutosTotalNoTotal, totalEstudo: totalEstudo, totalAula: totalAula, totalLeitura: totalLeitura, totalPesquisa: totalPesquisa, totalExercicio: totalExercicio, neutrinos: pontos}}}).then((req, res) => {}).catch((err) => {})
                            await User.findOneAndUpdate({_id: req.user._id}, {$push: {meusEventos: {dateCreater: new Date(),name: req.user.name, foto: req.user.foto, evento: req.body.tipo, subevento: req.body.subTipo, metodo: "Aberto", inicio: req.body.inicio, termino: req.body.termino, neutrinosGerado: (parseFloat(tempoTotalEstudado)/6).toFixed(2)}}}).then((req, res) => {console.log("deu certo")}).catch((err) => {console.log(err)})                        } else{
                            if(req.body.tipo == "Pesquisou"){
                                //--  somando minutos ao total --//
                                totalEstudo = await 0 + parseFloat(req.user.historico.totalEstudo)
                                totalAula = await 0 + parseFloat(req.user.historico.totalAula)
                                totalLeitura = await 0 + parseFloat(req.user.historico.totalLeitura)
                                totalPesquisa = await tempoTotalEstudado + parseFloat(req.user.historico.totalPesquisa)
                                totalExercicio = await 0 + parseFloat(req.user.historico.totalExercicio)
                                pontos = parseFloat((req.user.historico.neutrinos).toFixed(2)) + parseFloat(((tempoTotalEstudado)/6).toFixed(2))
                                await User.findOneAndUpdate({_id: req.user._id}, {$set: {historico: {dia: minutosTotalNoDia, semana: minutosTotalNoSemana, mes: minutosTotalNoMes, total: minutosTotalNoTotal, totalEstudo: totalEstudo, totalAula: totalAula, totalLeitura: totalLeitura, totalPesquisa: totalPesquisa, totalExercicio: totalExercicio, neutrinos: pontos}}}).then((req, res) => {}).catch((err) => {})
                                await User.findOneAndUpdate({_id: req.user._id}, {$push: {meusEventos: {dateCreater: new Date(),name: req.user.name, foto: req.user.foto, evento: req.body.tipo, subevento: req.body.subTipo, metodo: "Aberto", inicio: req.body.inicio, termino: req.body.termino, neutrinosGerado: (parseFloat(tempoTotalEstudado)/6).toFixed(2)}}}).then((req, res) => {console.log("deu certo")}).catch((err) => {console.log(err)})                            } else{
                                if(req.body.tipo == "Exercitou"){
                                    //--  somando minutos ao total --//
                                    totalEstudo = await 0 + parseFloat(req.user.historico.totalEstudo)
                                    totalAula = await 0 + parseFloat(req.user.historico.totalAula)
                                    totalLeitura = await 0 + parseFloat(req.user.historico.totalLeitura)
                                    totalPesquisa = await 0 + parseFloat(req.user.historico.totalPesquisa)
                                    totalExercicio = await tempoTotalEstudado + parseFloat(req.user.historico.totalExercicio)
                                    pontos = parseFloat((req.user.historico.neutrinos).toFixed(2)) + parseFloat(((tempoTotalEstudado)/4).toFixed(2))
                                    await User.findOneAndUpdate({_id: req.user._id}, {$set: {historico: {dia: minutosTotalNoDia, semana: minutosTotalNoSemana, mes: minutosTotalNoMes, total: minutosTotalNoTotal, totalEstudo: totalEstudo, totalAula: totalAula, totalLeitura: totalLeitura, totalPesquisa: totalPesquisa, totalExercicio: totalExercicio, neutrinos: pontos}}}).then((req, res) => {}).catch((err) => {})
                                    await User.findOneAndUpdate({_id: req.user._id}, {$push: {meusEventos: {dateCreater: new Date(),name: req.user.name, foto: req.user.foto, evento: req.body.tipo, subevento: req.body.subTipo, metodo: "Aberto", inicio: req.body.inicio, termino: req.body.termino, neutrinosGerado: (parseFloat(tempoTotalEstudado)/4).toFixed(2)}}}).then((req, res) => {console.log("deu certo")}).catch((err) => {console.log(err)})                                
                                }    
                            }
                        }
                    }
                }
                
            console.log(req.user.name+ ", cadastrou novo tempo")
            req.flash("sucess_msg", req.user.name+ ", seu tempo foi cadastrado") // apresenta na tela a msg de salvo
            res.redirect("/tempo/aberto") //redireciona para a pagina
        }).catch((err) => {
            console.log("erro ao cadastrar meta: "+ err)
            req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar seu tempo. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/user/aberto") // redireciona para a pagina
        })

        } catch(err) {
            console.log("erro ao acrescentar tempo: " +err)
            req.flash("error_msg", "Houve um erro ao salvar") // apresenta uma mensagem de erro
            res.redirect("/user/aberto") // redireciona para a pagina
        }
    })

//-- Rota que registra novo tempo pelo metodo pomodoro --//
    router.post('/registerTempoPomodoro', async (req, res) => {
        try{
        //-- transformando a data do formato americano para o formato Brasileiro --//
            var nova_Data = await funcdata.novadata(new Date())

        //-- Calculando a quantidade de minutos estudados --//
            tempoTotalEstudado = await parseFloat(funcdata.tempoEstudado(req.body.inicio, req.body.termino).toFixed(2))

        //-- persistindo no banco de dados --//
            await User.findOneAndUpdate({ _id: req.user._id }, {$push: { tempos: {dateCreater: new Date(), novaData: nova_Data, inicio: req.body.inicio, termino: req.body.termino, tempoEstudado: tempoTotalEstudado, tipo: req.body.tipo, subTipo: req.body.subTipo, metodo: "Pomodoro"} }}).then(async () =>{

            //-- Somando minutos ao dia --// 
                minutosTotalNoDia = await parseFloat(tempoTotalEstudado) + parseFloat(req.user.historico.dia)  
                minutosTotalNoSemana = await tempoTotalEstudado + parseFloat(req.user.historico.semana)
                minutosTotalNoMes = await tempoTotalEstudado + parseFloat(req.user.historico.mes)        
                minutosTotalNoTotal = await tempoTotalEstudado + parseFloat(req.user.historico.total)
            //-- verificando quantos eventos tem --//
                var eventos = await User.findOne({_id: req.user._id}).select('meusEventos')
                eventos = eventos.meusEventos
                var tam = eventos.length
            //-- se tiver mais que 4 eventos o ultimo evento será removido  --//
                if(tam > 4){
                    await User.findOneAndUpdate({_id: req.user._id}, { $pop: { "meusEventos" : -1 } }).then((req, res) => {console.log("deu certo")}).catch((err) => {console.log(err)})
                }

                if(req.body.tipo == "Estudou"){
                //--  somando minutos ao total --//
                totalEstudo = await tempoTotalEstudado + parseFloat(req.user.historico.totalEstudo)
                totalAula = await 0 + parseFloat(req.user.historico.totalAula)
                totalLeitura = await 0 + parseFloat(req.user.historico.totalLeitura)
                totalPesquisa = await 0 + parseFloat(req.user.historico.totalPesquisa)
                totalExercicio = await 0 + parseFloat(req.user.historico.totalExercicio)
                pontos = parseFloat((req.user.historico.neutrinos).toFixed(2)) + parseFloat(((tempoTotalEstudado)/10).toFixed(2))
                await User.findOneAndUpdate({_id: req.user._id}, {$set: {historico: {dia: minutosTotalNoDia, semana: minutosTotalNoSemana, mes: minutosTotalNoMes, total: minutosTotalNoTotal, totalEstudo: totalEstudo, totalAula: totalAula, totalLeitura: totalLeitura, totalPesquisa: totalPesquisa, totalExercicio: totalExercicio, neutrinos: pontos}}}).then((req, res) => {}).catch((err) => {})
                await User.findOneAndUpdate({_id: req.user._id}, {$push: {meusEventos: {dateCreater: new Date(),name: req.user.name, foto: req.user.foto, evento: req.body.tipo, subevento: req.body.subTipo, metodo: "Pomodoro", inicio: req.body.inicio, termino: req.body.termino, neutrinosGerado: (parseFloat(tempoTotalEstudado)/10).toFixed(2)}}}).then((req, res) => {console.log("deu certo")}).catch((err) => {console.log(err)})
                } else{
                    if(req.body.tipo == "Assistiu aula"){
                        //--  somando minutos ao total --//
                        totalEstudo = await 0 + parseFloat(req.user.historico.totalEstudo)
                        totalAula = await tempoTotalEstudado + parseFloat(req.user.historico.totalAula)
                        totalLeitura = await 0 + parseFloat(req.user.historico.totalLeitura)
                        totalPesquisa = await 0 + parseFloat(req.user.historico.totalPesquisa)
                        totalExercicio = await 0 + parseFloat(req.user.historico.totalExercicio)
                        pontos = parseFloat((req.user.historico.neutrinos).toFixed(2)) + parseFloat(((tempoTotalEstudado)/10).toFixed(2))
                        await User.findOneAndUpdate({_id: req.user._id}, {$set: {historico: {dia: minutosTotalNoDia, semana: minutosTotalNoSemana, mes: minutosTotalNoMes, total: minutosTotalNoTotal, totalEstudo: totalEstudo, totalAula: totalAula, totalLeitura: totalLeitura, totalPesquisa: totalPesquisa, totalExercicio: totalExercicio, neutrinos: pontos}}}).then((req, res) => {}).catch((err) => {})
                        await User.findOneAndUpdate({_id: req.user._id}, {$push: {meusEventos: {dateCreater: new Date(),name: req.user.name, foto: req.user.foto, evento: req.body.tipo, subevento: req.body.subTipo, metodo: "Pomodoro", inicio: req.body.inicio, termino: req.body.termino, neutrinosGerado: (parseFloat(tempoTotalEstudado)/10).toFixed(2)}}}).then((req, res) => {console.log("deu certo")}).catch((err) => {console.log(err)})
                    } else{
                        if(req.body.tipo == "Leitura"){
                            //--  somando minutos ao total --//
                            totalEstudo = await 0 + parseFloat(req.user.historico.totalEstudo)
                            totalAula = await 0 + parseFloat(req.user.historico.totalAula)
                            totalLeitura = await tempoTotalEstudado + parseFloat(req.user.historico.totalLeitura)
                            totalPesquisa = await 0 + parseFloat(req.user.historico.totalPesquisa)
                            totalExercicio = await 0 + parseFloat(req.user.historico.totalExercicio)
                            pontos = parseFloat((req.user.historico.neutrinos).toFixed(2)) + parseFloat(((tempoTotalEstudado)/6).toFixed(2))
                            await User.findOneAndUpdate({_id: req.user._id}, {$set: {historico: {dia: minutosTotalNoDia, semana: minutosTotalNoSemana, mes: minutosTotalNoMes, total: minutosTotalNoTotal, totalEstudo: totalEstudo, totalAula: totalAula, totalLeitura: totalLeitura, totalPesquisa: totalPesquisa, totalExercicio: totalExercicio, neutrinos: pontos}}}).then((req, res) => {}).catch((err) => {})
                            await User.findOneAndUpdate({_id: req.user._id}, {$push: {meusEventos: {dateCreater: new Date(),name: req.user.name, foto: req.user.foto, evento: req.body.tipo, subevento: req.body.subTipo, metodo: "Pomodoro", inicio: req.body.inicio, termino: req.body.termino, neutrinosGerado: (parseFloat(tempoTotalEstudado)/6).toFixed(2)}}}).then((req, res) => {console.log("deu certo")}).catch((err) => {console.log(err)})
                        } else{
                            if(req.body.tipo == "Pesquisou"){
                                //--  somando minutos ao total --//
                                totalEstudo = await 0 + parseFloat(req.user.historico.totalEstudo)
                                totalAula = await 0 + parseFloat(req.user.historico.totalAula)
                                totalLeitura = await 0 + parseFloat(req.user.historico.totalLeitura)
                                totalPesquisa = await tempoTotalEstudado + parseFloat(req.user.historico.totalPesquisa)
                                totalExercicio = await 0 + parseFloat(req.user.historico.totalExercicio)
                                pontos = parseFloat((req.user.historico.neutrinos).toFixed(2)) + parseFloat(((tempoTotalEstudado)/6).toFixed(2))
                                await User.findOneAndUpdate({_id: req.user._id}, {$set: {historico: {dia: minutosTotalNoDia, semana: minutosTotalNoSemana, mes: minutosTotalNoMes, total: minutosTotalNoTotal, totalEstudo: totalEstudo, totalAula: totalAula, totalLeitura: totalLeitura, totalPesquisa: totalPesquisa, totalExercicio: totalExercicio, neutrinos: pontos}}}).then((req, res) => {}).catch((err) => {})
                                await User.findOneAndUpdate({_id: req.user._id}, {$push: {meusEventos: {dateCreater: new Date(),name: req.user.name, foto: req.user.foto, evento: req.body.tipo, subevento: req.body.subTipo, metodo: "Pomodoro", inicio: req.body.inicio, termino: req.body.termino, neutrinosGerado: (parseFloat(tempoTotalEstudado)/6).toFixed(2)}}}).then((req, res) => {console.log("deu certo")}).catch((err) => {console.log(err)})
                            } else{
                                if(req.body.tipo == "Exercitou"){
                                    //--  somando minutos ao total --//
                                    totalEstudo = await 0 + parseFloat(req.user.historico.totalEstudo)
                                    totalAula = await 0 + parseFloat(req.user.historico.totalAula)
                                    totalLeitura = await 0 + parseFloat(req.user.historico.totalLeitura)
                                    totalPesquisa = await 0 + parseFloat(req.user.historico.totalPesquisa)
                                    totalExercicio = await tempoTotalEstudado + parseFloat(req.user.historico.totalExercicio)
                                    pontos = parseFloat((req.user.historico.neutrinos).toFixed(2)) + parseFloat(((tempoTotalEstudado)/4).toFixed(2))
                                    await User.findOneAndUpdate({_id: req.user._id}, {$set: {historico: {dia: minutosTotalNoDia, semana: minutosTotalNoSemana, mes: minutosTotalNoMes, total: minutosTotalNoTotal, totalEstudo: totalEstudo, totalAula: totalAula, totalLeitura: totalLeitura, totalPesquisa: totalPesquisa, totalExercicio: totalExercicio, neutrinos: pontos}}}).then((req, res) => {}).catch((err) => {})
                                    await User.findOneAndUpdate({_id: req.user._id}, {$push: {meusEventos: {dateCreater: new Date(),name: req.user.name, foto: req.user.foto, evento: req.body.tipo, subevento: req.body.subTipo, metodo: "Pomodoro", inicio: req.body.inicio, termino: req.body.termino, neutrinosGerado: (parseFloat(tempoTotalEstudado)/4).toFixed(2)}}}).then((req, res) => {console.log("deu certo")}).catch((err) => {console.log(err)})
                                }    
                            }
                        }
                    }
                }
                
            console.log(req.user.name+ ", cadastrou novo tempo")
            req.flash("sucess_msg", req.user.name+ ", seu tempo foi cadastrado") // apresenta na tela a msg de salvo
            res.redirect("/tempo/aberto") //redireciona para a pagina
        }).catch((err) => {
            console.log("erro ao cadastrar meta: "+ err)
            req.flash("error_msg",req.user.name + "Houve um erro ao cadastrar seu tempo. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/user/aberto") // redireciona para a pagina
        })

        } catch(err) {
            console.log("erro ao acrescentar tempo: " +err)
            req.flash("error_msg", "Houve um erro ao salvar") // apresenta uma mensagem de erro
            res.redirect("/user/aberto") // redireciona para a pagina
        }
    })

//--Rota para deletar tempo do banco de dados--//
    router.post('/deletarTempo', async (req, res) =>{
        //-- removendo elemento --//
        try{
           User.findOneAndUpdate({ _id: req.user._id },{ $pull: { tempos: { _id: req.body.id } } }).then( async() =>{
                minutosTotalNoDia = await parseFloat(req.user.historico.dia) - parseFloat(req.body.tempoEstudado)
                minutosTotalNoSemana = await parseFloat(req.user.historico.semana) - parseFloat(req.body.tempoEstudado)
                minutosTotalNoMes = await parseFloat(req.user.historico.mes) - parseFloat(req.body.tempoEstudado)
                minutosTotalNoTotal = await parseFloat(req.user.historico.total) - parseFloat(req.body.tempoEstudado)
                //-- deletando evento --//
                await User.findOneAndUpdate({ _id: req.user._id },{ $pull: { meusEventos: { _id: req.body.id }}}).then((req, res) => {}).catch((err) => {})

                if(req.body.tipo == "Estudou"){
                //--  somando minutos ao total --//
                totalEstudo = await parseFloat(req.user.historico.totalEstudo) - parseFloat(req.body.tempoEstudado)
                totalAula = await 0 + parseFloat(req.user.historico.totalAula)
                totalLeitura = await 0 + parseFloat(req.user.historico.totalLeitura)
                totalPesquisa = await 0 + parseFloat(req.user.historico.totalPesquisa)
                totalExercicio = await 0 + parseFloat(req.user.historico.totalExercicio)
                pontos = req.user.historico.neutrinos - parseFloat(((minutosTotalNoTotal)/10).toFixed(2))
                await User.findOneAndUpdate({_id: req.user._id}, {$set: {historico: {dia: minutosTotalNoDia, semana: minutosTotalNoSemana, mes: minutosTotalNoMes, total: minutosTotalNoTotal, totalEstudo: totalEstudo, totalAula: totalAula, totalLeitura: totalLeitura, totalPesquisa: totalPesquisa, totalExercicio: totalExercicio, neutrinos: pontos}}}).then((req, res) => {}).catch((err) => {})

                } else{
                    if(req.body.tipo == "Assistiu aula"){
                        //--  somando minutos ao total --//
                        totalEstudo = await 0 + parseFloat(req.user.historico.totalEstudo)
                        totalAula = await parseFloat(req.user.historico.totalAula) - parseFloat(req.body.tempoEstudado)
                        totalLeitura = await 0 + parseFloat(req.user.historico.totalLeitura)
                        totalPesquisa = await 0 + parseFloat(req.user.historico.totalPesquisa)
                        totalExercicio = await 0 + parseFloat(req.user.historico.totalExercicio)
                        pontos = req.user.historico.neutrinos - parseFloat(((minutosTotalNoTotal)/10).toFixed(2))
                        await User.findOneAndUpdate({_id: req.user._id}, {$set: {historico: {dia: minutosTotalNoDia, semana: minutosTotalNoSemana, mes: minutosTotalNoMes, total: minutosTotalNoTotal, totalEstudo: totalEstudo, totalAula: totalAula, totalLeitura: totalLeitura, totalPesquisa: totalPesquisa, totalExercicio: totalExercicio, neutrinos: pontos}}}).then((req, res) => {}).catch((err) => {})

                    } else{
                        if(req.body.tipo == "Leitura"){
                            //--  somando minutos ao total --//
                            totalEstudo = await 0 + parseFloat(req.user.historico.totalEstudo)
                            totalAula = await 0 + parseFloat(req.user.historico.totalAula)
                            totalLeitura = await parseFloat(req.user.historico.totalLeitura) - parseFloat(req.body.tempoEstudado)
                            totalPesquisa = await 0 + parseFloat(req.user.historico.totalPesquisa)
                            totalExercicio = await 0 + parseFloat(req.user.historico.totalExercicio)
                            pontos = req.user.historico.neutrinos - parseFloat(((minutosTotalNoTotal)/6).toFixed(2))
                            await User.findOneAndUpdate({_id: req.user._id}, {$set: {historico: {dia: minutosTotalNoDia, semana: minutosTotalNoSemana, mes: minutosTotalNoMes, total: minutosTotalNoTotal, totalEstudo: totalEstudo, totalAula: totalAula, totalLeitura: totalLeitura, totalPesquisa: totalPesquisa, totalExercicio: totalExercicio, neutrinos: pontos}}}).then((req, res) => {}).catch((err) => {})
                    
                        } else{
                            if(req.body.tipo == "Pesquisou"){
                                //--  somando minutos ao total --//
                                totalEstudo = await 0 + parseFloat(req.user.historico.totalEstudo)
                                totalAula = await 0 + parseFloat(req.user.historico.totalAula)
                                totalLeitura = await 0 + parseFloat(req.user.historico.totalLeitura)
                                totalPesquisa = await parseFloat(req.user.historico.totalPesquisa) - parseFloat(req.body.tempoEstudado)
                                totalExercicio = await 0 + parseFloat(req.user.historico.totalExercicio)
                                pontos = req.user.historico.neutrinos - parseFloat(((minutosTotalNoTotal)/6).toFixed(2))
                                await User.findOneAndUpdate({_id: req.user._id}, {$set: {historico: {dia: minutosTotalNoDia, semana: minutosTotalNoSemana, mes: minutosTotalNoMes, total: minutosTotalNoTotal, totalEstudo: totalEstudo, totalAula: totalAula, totalLeitura: totalLeitura, totalPesquisa: totalPesquisa, totalExercicio: totalExercicio, neutrinos: pontos}}}).then((req, res) => {}).catch((err) => {})
                            } else{
                                if(req.body.tipo == "Exercitou"){
                                    //--  somando minutos ao total --//
                                    totalEstudo = await 0 + parseFloat(req.user.historico.totalEstudo)
                                    totalAula = await 0 + parseFloat(req.user.historico.totalAula)
                                    totalLeitura = await 0 + parseFloat(req.user.historico.totalLeitura)
                                    totalPesquisa = await 0 + parseFloat(req.user.historico.totalPesquisa)
                                    totalExercicio = await parseFloat(req.user.historico.totalExercicio) - parseFloat(req.body.tempoEstudado)
                                    pontos = req.user.historico.neutrinos - parseFloat(((minutosTotalNoTotal)/4).toFixed(2))
                                    await User.findOneAndUpdate({_id: req.user._id}, {$set: {historico: {dia: minutosTotalNoDia, semana: minutosTotalNoSemana, mes: minutosTotalNoMes, total: minutosTotalNoTotal, totalEstudo: totalEstudo, totalAula: totalAula, totalLeitura: totalLeitura, totalPesquisa: totalPesquisa, totalExercicio: totalExercicio, neutrinos: pontos}}}).then((req, res) => {}).catch((err) => {})
                                }    
                            }
                        }
                    }
                }

            console.log(req.user.name+ ", um tempo")
            req.flash("sucess_msg", req.user.name+ ", Seu tempo foi deletado") // apresenta na tela a msg de salvo
            res.redirect("/tempo/home") //redireciona para a pagina
           }).catch((err) => {
            console.log("erro ao deletar tempo: "+err)
            req.flash("error_msg",req.user.name + "Houve um erro ao deletar seu tempo. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/user/home") // redireciona para a pagina

        })} catch(err){
            console.log("erro ao deletar meta: "+err)
            req.flash("error_msg",req.user.name + "Houve um erro ao deletar seu tempo. Entre em contato pelo suporte.") // apresenta uma mensagem de erro
            res.redirect("/user/home") // redireciona para a pagina
        }
    });

//-- rota responsavel por enviar email ao suporte --//
    router.post('/enviarEmail', async (req, res) => {
        try{
        //-- neviando email --//
            enviarEmail.suporte(req.user.name, req.body.assunto, req.body.texto, req.user.email)

            req.flash("sucess_msg", req.user.name + ", seu email foi enviado. Analisaremos o conteúdo e responderemos em até 3 dias.")
            res.redirect('/user/suporte')
        }catch(err){
            req.flash("error_msg", req.user.name + ", houve um erro ao enviar")
            res.redirect('/user/suporte')
        }
    })

//-- rota responsavel por enviar uma nova senha para o usuario --//
    router.post('/enviaCodigo', async (req, res) => {
        try{
        //-- função responsavel por gerar nova senha aleatoria --//
            function makeid() {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()_+={}?/][";
                for (var i = 0; i < 10; i++)
                    text += possible.charAt(Math.floor(Math.random() * possible.length));

                return text;
            }
                
        //-- verificando se existe no sistema o e-mail informado pelo usuario --//
            var x = await User.findOne({email: req.body.email}, {email: req.body.email})
            if(x.email == req.body.email){
            //-- recebendo senha aleatoria --//
                var text =  makeid()

            //-- hasheando a senha para salva no banco de dados --//
                const hash = await bct.hash(text, 5);
                await enviarEmail.SendSenha(req.body.email, text)
                await User.updateOne({email: req.body.email}, {password: hash}, function(err, res) {
                });

                req.flash("sucess_msg", "Enviamos uma nova senha para seu E-mail")
                res.redirect('/')
            } else{
                await enviarEmail.SendSenha(req.body.email, "Esse Email não possui cadastro. Faça seu cadastro e venha para a Improdutiva Estudos LTDA")
                req.flash("error_msg", "Esse E-mail não possui cadastro.")
                res.redirect('/')
            }
        } catch(err){
        //-- Enviando email de convite para usuario que não possui cadastro --//
            await enviarEmail.SendSenha(req.body.email, "Esse Email não possui cadastro. Faça seu cadastro e venha para a Improdutiva Estudos LTDA")
            console.log("Erro ao mandar codigo para mudar senha: ", err)
            req.flash("error_msg", "Houve um erro ao enviar o codigo")
            res.redirect('/')
        }
    })


//-- Rota que registra novo tempo e adiciona novo tempo ao bd no dia, semana, mes e total do usuario --//
    router.post('/registerAtividade', async (req, res) => {
        try{        
        //-- Criando objeto --//
            const novoTempo = {
                status: false,
                estudante: req.user._id, 
                horarioInicial: req.body.horarioInicial, 
                horarioTermino: req.body.horarioTermino,
                atividade: req.body.atividade,
                dia: req.body.dia,
            }

        //-- Persistindo no banco de dados --//
            new Atividade(novoTempo).save().then( async () => {
                //-- registrando evento --//
                console.log(req.user.name + " Acresentou novo atividade ao Cronograma")
                req.flash("sucess_msg", "atividade salvo com sucesso") // apresenta na tela a msg de salvo
                res.redirect("/perfis/cronograma") //redireciona para a pagina
            }).catch((err) => {
                console.log("Houve um erro ao salvar uma nova atividade"+err)
                req.flash("error_msg", "Houve um erro ao salvar") // apresenta uma mensagem de erro
                res.redirect("/perfis/meuPerfil") // redireciona para a pagina
            })
        } catch(err) {
            console.log("Houve um erro ao salvar uma nova atividade"+err)
            req.flash("error_msg", "Houve um erro ao salvar") // apresenta uma mensagem de erro
            res.redirect("/perfis/meuPerfil") // redireciona para a pagina
        }
    })

//-- Rota responsavel por concluir uma atividade --//
    router.post('/concluiratividade', (req, res) =>{
        try{
        //-- mudando o status no banco de dados para true --//
            Atividade.updateOne({_id: req.body.id}, {status: true}, async  function(err, res) {
            //-- Somando minutos ao dia --// 
                minutosTotalNoDia = await 0 + parseFloat(req.user.historico.dia)  
                minutosTotalNoSemana = await 0 + parseFloat(req.user.historico.semana)
                minutosTotalNoMes = await 0 + parseFloat(req.user.historico.mes)        
                minutosTotalNoTotal = await 0 + parseFloat(req.user.historico.total)
            //--  somando minutos ao total --//
                totalEstudo = await 0 + parseFloat(req.user.historico.totalEstudo)
                totalAula = await 0 + parseFloat(req.user.historico.totalAula)
                totalLeitura = await 0 + parseFloat(req.user.historico.totalLeitura)
                totalPesquisa = await 0 + parseFloat(req.user.historico.totalPesquisa)
                totalExercicio = await 0 + parseFloat(req.user.historico.totalExercicio)
                pontos = req.user.historico.neutrinos + 3
                //-- adicionando os posntos aos neutrinos --//
                await User.findOneAndUpdate({_id: req.user._id}, {$set: {historico: {dia: minutosTotalNoDia, semana: minutosTotalNoSemana, mes: minutosTotalNoMes, total: minutosTotalNoTotal, totalEstudo: totalEstudo, totalAula: totalAula, totalLeitura: totalLeitura, totalPesquisa: totalPesquisa, totalExercicio: totalExercicio, neutrinos: pontos}}}).then((req, res) => {}).catch((err) => {})
                //-- verificando quantos eventos tem --//
                var eventos = await User.findOne({_id: req.user._id}).select('meusEventos')
                eventos = eventos.meusEventos
                var tam = eventos.length
                //-- se tiver mais que 4 eventos o ultimo evento será removido  --//
                if(tam > 4){
                    await User.findOneAndUpdate({_id: req.user._id}, { $pop: { "meusEventos" : -1 } }).then((req, res) => {console.log("deu certo")}).catch((err) => {console.log(err)})
                }
                //-- registrando evento --//
                await User.findOneAndUpdate({_id: req.user._id}, {$push: {meusEventos: {dateCreater: new Date(), evento: "Concluio atividade de seu cronograma", name: req.user.name, foto: req.user.foto, subevento: "", metodo: "", inicio: req.body.horarioInicial, termino: req.body.horarioTermino, neutrinosGerado: 3}}}).then((req, res) => {}).catch((err) => {})
                console.log(req.user.name + " concluio uma atividade.")
                req.flash("sucess_msg", "Atividade concluída. Você ganhou:" +pontos+" pontos")
                
            });
            res.redirect('/user/home')
        }catch(err){
            console.log(req.user.name + "Erro ao concluir atividade: " + err)
            req.flash("error_msg", "Houve um erro ao concluir atividade")
            res.redirect('/user/home')
        }

    })

//--Rota para deletar usuarios do banco de dados--//
    router.post('/deletarAtividade', (req, res) =>{
        try{
            //--Deletando do banco os tempos do usuario que será deletado--//
            Atividade.deleteOne({ _id: req.body.id }).then((res, req) => {
                res.redirect('/perfis/cronograma')
            })
        } catch(err){
            console.log(req.user.name + " Erro ao deletar atividade: " + err)
            req.flash("error_msg", "erro ao deletar a atividade")
            res.redirect('/perfis/meuPerfil')
        }
    });

//-- Rota para registrar recado --//
    router.post('/registerRecado', async (req, res) => {
        try{        
            //-- Atualizando recado --//
            await User.updateOne({_id: req.user._id}, {recado: req.body.recado}, function(err, res) {});

            console.log(req.user.name + " Registrou recado")
            req.flash("sucess_msg", "Seu recado foi salvo.") // apresenta na tela a msg de salvo
            res.redirect("/user/home") //redireciona para a pagina

        } catch(err) {
            req.flash("error_msg", "Houve um erro ao salvar") // apresenta uma mensagem de erro
            res.redirect("/user/home")
            console.log("Deu erro ao salvar recado: ", err)
        }
    })

//-- Rota para editar perfil --//
    router.post("/editPerfil", async (req, res) => {
        try{
        //-- Atualizando o bd User com os dados recebidos --//
            await User.updateOne({_id: req.user._id}, {name: req.body.name}, function(err, res) {
            });
            await User.updateOne({_id: req.user._id},{curso: req.body.curso}, function(err, res) {
            });
            await User.updateOne({_id: req.user._id}, {foto: req.body.foto}, function(err, res) {
            });
            await User.updateOne({_id: req.user._id}, {email: req.body.email}, function(err, res) {
            });
            await User.updateOne({_id: req.user._id}, {bio: req.body.bio}, function(err, res) {
            });
            await User.updateOne({_id: req.user._id}, {cidade: req.body.cidade}, function(err, res) {
            });
            await User.updateOne({_id: req.user._id}, {objetivo: req.body.objetivo}, function(err, res) {
            });
            var senha = await bct.hash(req.body.password, 5);
            await User.updateOne({_id: req.user._id}, {password: senha}, function(err, res) {
            });

            console.log(req.user.name + " Editou o perfil")
            req.flash("sucess_msg", "Perfil editado")
            res.redirect("/user/home")

        } catch(err){
            console.log("Deu erro ao editar o perfil "+ req.user.name + err)
        }
    })



module.exports = router
