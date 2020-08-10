//-- Importação --//
const mongoose = require("mongoose")
require('../models/Dia')
require('../models/Atividade')
require('../models/User')
const Dia = mongoose.model("dias")
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

//-- Que retorna o nome do dia da semana --//
    diadasemana: function(data){
        var recebimento = new Date(data)
    
        var diadasemana = recebimento.getDay().toString()
    
        if(diadasemana == 0){
            return "Segunda-feira"
        }
    
        if(diadasemana == 1){
            return "Terça-feira"
        }
    
        if(diadasemana == 2){
            return "Quarta-feira"
        }
    
        if(diadasemana == 3){
            return "Quinta-feira"
        }
    
        if(diadasemana == 4){
            return "Sexta-feira"
        }
    
        if(diadasemana == 5){
            return "Sabado"
        }
    
        if(diadasemana == 6){
            return "Domingo"
        }
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
/*
//-- Função que verifica o dia se o dia mudou e set 0 na variavel dia do banco de dados --//
    verifcaDia: async function(){ 

        var dataBD = await Dia.findOne({_id: "5f30b457509764126095e6d7"})
        
        setInterval( async function(){
        let data = await new Date()
        let dataAtual = await data.getDate()

        console.log("data de hoje: " + dataAtual)
        console.log("data do BD: " + dataBD.dataAtual)

        if(dataAtual != dataBD){
            console.log("o sistema verificou se mudou o dia: " + true +" às: " )
            await User.updateMany({historico: {dia: 0}}, function(err, res) {//-- zerando as horas diarias --//
                console.log("dia atualizado")
            });

            await Atividade.updateMany({status: false}, function(err, res) {
                console.log("Atividades atualizadas")
            });

            await Atividade.updateMany({dataAtual: new Date}, function(err, res) {
                console.log("Atividades atualizadas")
            });



        }else{
            console.log("o sistema verificou se mudou o dia: " + false +" às: " + horaAtual)
        }
        },5000)
    
    },

//-- Função que verifica se a semana passou, mas não está funcionando --//
    verifcaSemana: async function(){

        setInterval( async function(){
        let data = new Date()
        let diaDaSemana = data.getDay()
        let horaAtual = data.getHours()

        if(diaDaSemana == "1" && horaAtual == "3"){
            console.log("o sistema verificou se mudou a semana: " + true +" às: " + horaAtual)
            await User.updateMany({historico: {semana: 0}}, function(err, res) {
                console.log("A semana foi atualizada")
            });

        }else{
            console.log("o sistema verificou se mudou a semana: " + false +" às: " + horaAtual)
        }
        },3600000)        

    },

//-- Função que verifica o mes, mas ainda esta em teste --//
    verifcaMes: async function(){

        setInterval(async function(){
        let data = new Date()
        let diaAtual = data.getDate()
        let horaAtual = data.getHours()

        if(diaAtual == "1" && horaAtual == "3"){
            console.log("o sistema verificou se mudou o mes: " + true +" às: " + horaAtual)
            await User.updateMany({historico: {mes: 0}}, function(err, res) {//-- zerando as horas diarias --//
                console.log("o sistema verificou se mudou o mes: " + true +" às: " + horaAtual)
            });

        }else{
            console.log("o sistema verificou se mudou o dia: " + false)
        }
        },3600000)
        // hora 3600000
    },
    */
}
