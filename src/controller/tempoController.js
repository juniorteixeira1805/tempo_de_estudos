//-- Importação --//
const mongoose = require("mongoose")
require('../models/Dia')
require('../models/Atividade')
require('../models/User')
const Dia = mongoose.model("datas")
const User = mongoose.model("users")
const Atividade =  mongoose.model("atividades")


module.exports = {

//-- Função que retorna a data em formato americano para o formato brasileiro --//
    FormatarData: function(data) {
        var ano  = data.split("-")[0];
        var mes  = data.split("-")[1];
         var dia  = data.split("-")[2];
      
        return dia + '/' + ("0"+mes).slice(-2) + '/' + (ano)
        // Utiliza o .slice(-2) para garantir o formato com 2 digitos.
      },

//-- Função que retorna o tempo decorrido --//
    tempoEstudado: function(inicio, fim){

    //-- separando as horas dos minutos --//
        vetorDeHora = inicio.split(":");
        hrInicial = parseInt(vetorDeHora[0])
        minutoInicial = parseInt(vetorDeHora[1])

        vetorDeHora = fim.split(":");
        hrFinal = parseInt(vetorDeHora[0])
        minutoFinal = parseInt(vetorDeHora[1])

    //-- verificando se a hora inicial é maior que a final e tratando --//
        if(hrInicial>hrFinal){
            hrInicial = 24 - hrInicial
            tempoTotal = (60*(hrInicial+hrFinal))+(minutoFinal-minutoInicial)
        } else{
            tempoTotal = (60*(hrFinal-hrInicial))+(minutoFinal-minutoInicial) //-- somando todos os minutos --//
        }
        return tempoTotal;
    },

//-- Função que retorna data no formato dd/mm/aaaa --//
    novadata: function(data){
        
        var recebimento = new Date(data) //-- Criando data do momento --//
        var dia = ( recebimento.getDate()).toString() //-- extraindo o dia da data criada --//

    //-- Acrescentando os 0 para quando tiver um algarismo --//
        if(dia < 10){
            dia = "0" + dia
        }
        var mes = (1 + recebimento.getMonth()).toString()
        if(mes < 10){
            mes = "0" + mes
        }

    //-- Extraindo o ano --//
        var ano = recebimento.getFullYear().toString()
        
    
        var datadeRecebimento = dia + "/" + mes + "/" + ano //-- Juntando tudo --//
    
        return datadeRecebimento
    },

//-- Função que verifica o dia se o dia mudou e set 0 na variavel dia do banco de dados --//
    verifcaData: async function(){ 

    //-- buscando dados do BD --//
        var dataBD = await Dia.findOne({_id: "5f3a7535f90f5f08bc588bbd"})
        var diaBD = dataBD.dia

    //-- buscando data atual --//
        var data = new Date
        var diaAtual = data.getDate()
        var semanaAtual = data.getDay()

    //-- função que verifica quando o servidor é iniciado --//
        if(diaAtual != diaBD){
            if(semanaAtual == "1"){
                await User.updateMany({$set: {'historico.semana': 0}}, function(err, res) {//-- zerando as horas diarias --//
                    console.log("Zerando semanas...")
                });
            }

            if(diaAtual == "1"){
                await User.updateMany({$set: {'historico.mes': 0}}, function(err, res) {//-- zerando as horas diarias --//
                    console.log("Zerando meses...")
                });
                await User.updateMany({$set: {'historico.neutrinos': 0}}, function(err, res) {//-- zerando as horas diarias --//
                    console.log("Zerando neutrinos...")
                });
            }

            await User.updateMany({$set: {'historico.dia': 0}}, function(err, res) {//-- zerando as horas diarias --//
                console.log("zerando dias...")
            });

            await Atividade.updateMany({status: false}, function(err, res) {
                console.log("Atividades atualizadas.")
            });

            await Dia.update({_id: "5f3a7535f90f5f08bc588bbd"},{dia: diaAtual}, function(err, res) {
                console.log("Dia do BD atualizado.")
            });

        }else{
            console.log("o sistema verificou se mudou o dia: " + false)
        }

        //-- função que verifica periodicamente --//
        setInterval( async function(){
        //-- buscando dados do BD --//
            dataBD = await Dia.findOne({_id: "5f3a7535f90f5f08bc588bbd"})
            diaBD = dataBD.dia

        //-- buscando data atual --//
            data = new Date
            diaAtual = data.getDate()
            semanaAtual = data.getDay()
        //-- função que verifica quando o servidor é iniciado --//
        if(diaAtual != diaBD){
            if(semanaAtual == "1"){
                await User.updateMany({$set: {'historico.semana': 0}}, function(err, res) {//-- zerando as horas diarias --//
                    console.log("Zerando semanas...")
                });
            }

            if(diaAtual == "1"){
                await User.updateMany({$set: {'historico.mes': 0}}, function(err, res) {//-- zerando as horas diarias --//
                    console.log("Zerando meses...")
                });
                await User.updateMany({$set: {'historico.neutrinos': 0}}, function(err, res) {//-- zerando as horas diarias --//
                    console.log("Zerando neutrinos...")
                });
            }

            await User.updateMany({$set: {'historico.dia': 0}}, function(err, res) {//-- zerando as horas diarias --//
                console.log("zerando dias...")
            });

            await Atividade.updateMany({status: false}, function(err, res) {
                console.log("Atividades atualizadas.")
            });

            await Dia.update({_id: "5f3a7535f90f5f08bc588bbd"},{dia: diaAtual}, function(err, res) {
                console.log("Dia do BD atualizado.")
            });

        }else{
            console.log("o sistema verificou se mudou o dia: " + false)
        }
        },60000)
    
    },
}
