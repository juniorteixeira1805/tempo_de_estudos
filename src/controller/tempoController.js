//-- Importação --//
const mongoose = require("mongoose")

require('../models/User');
const User = mongoose.model("users");

module.exports = {

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

//-- Função que verifica o dia se o dia mudou e set 0 na variavel dia do banco de dados --//
    verifcaDia: function(diaAnterior){ //-- parametro é o dia salvo no BD --//
        
        var dataCriada = new Date()
        
        var diaatual = ( dataCriada.getDate()).toString()

        if(diaatual != diaAnterior){ //-- verifca o dia atual com o dia salvo no bd (Tem de mudar, pq esta sendo true às 21:00 por causa do fuso horario) --//
            User.updateMany({dia: 0}, function(err, res) {//-- zerando as horas diarias --//
            });

            User.updateMany({diaAnterior: diaatual}, function(err, res) { //-- O dia do bd recebe o dia de hj --//
            });
        }
    
    },

//-- Função que verifica se a semana passou, mas não está funcionando --//
    verifcaSemana: function(semanaAnterior){
        
        var dataCriada = new Date()
        
        var diaDaSemana = ( dataCriada.getDay()).toString()
        if(diaDaSemana == semanaAnterior){
            User.updateMany({semana: 0}, function(err, res) {
            });
            User.updateMany({semanaAnterior: 8}, function(err, res) {
            });

        }if(diaDaSemana == 1){
            User.updateMany({semanaAnterior: 7}, function(err, res) {
            });
        }
    
    },

//-- Função que verifica o mes, mas ainda esta em teste --//
    verifcaMes: function(mesAnterior){
        
        var dataCriada = new Date()
        
        var mesAtual =  dataCriada.getMonth() +1

        if(mesAtual != mesAnterior){
            User.updateMany({mes: 0}, function(err, res) {
            });

            User.updateMany({mesAnterior: mesAtual}, function(err, res) {
            });
        }
    
    },
}