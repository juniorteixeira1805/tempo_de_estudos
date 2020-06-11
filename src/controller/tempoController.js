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

}