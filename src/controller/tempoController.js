const mongoose = require("mongoose")

require('../models/User');
const User = mongoose.model("users");

module.exports = {

    tempoEstudado: function(inicio, fim){

        vetorDeHora = inicio.split(":");
        hrInicial = parseInt(vetorDeHora[0])
        minutoInicial = parseInt(vetorDeHora[1])

        vetorDeHora = fim.split(":");
        hrFinal = parseInt(vetorDeHora[0])
        minutoFinal = parseInt(vetorDeHora[1])


        if(hrInicial>hrFinal){
            hrInicial = 24 - hrInicial
            tempoTotal = (60*(hrInicial+hrFinal))+(minutoFinal-minutoInicial)
        } else{
            tempoTotal = (60*(hrFinal-hrInicial))+(minutoFinal-minutoInicial)
        }
        return tempoTotal;
    },

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
    
    novadata: function(data){
        
        var recebimento = new Date(data)
        var dia = ( recebimento.getDate()).toString()
        if(dia < 10){
            dia = "0" + dia
        }
        var mes = (1 + recebimento.getMonth()).toString()
        if(mes < 10){
            mes = "0" + mes
        }

        var ano = recebimento.getFullYear().toString()
        
    
        var datadeRecebimento = dia + "/" + mes + "/" + ano
    
        return datadeRecebimento
    },

    verifcaDia: function(diaAnterior){
        
        var dataCriada = new Date()
        
        var diaatual = ( dataCriada.getDate()).toString()

        if(diaatual != diaAnterior){
            User.updateMany({dia: 0}, function(err, res) {
            });

            User.updateMany({diaAnterior: diaatual}, function(err, res) {
            });
        }
    
    },

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