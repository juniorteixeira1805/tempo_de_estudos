const mongoose = require('mongoose')
const Schema = mongoose.Schema


const AtividadeSchema = new mongoose.Schema({
    dateCreater: {
        type: Date //-- Data de criação --//
    },
    estudante: {
        type: Schema.Types.ObjectId, //-- Salva o id do dono da atividade --//
        ref: "users"
    },

    horarioInicial: {
        type: String, //-- Inicio da atividade --//
        require: true
    },
    horarioTermino: {
        type: String, //-- Fim da atividade --//
        require: true
    },
    atividade: {
        type: String, //-- Qual atividade --//
        require: true
    },

//-- Verificador para mostrar na view --//
    verifSegunda: {
        type: Boolean, 
    },
    verifTerca: {
        type: Boolean, 
    },
    verifQuarta: {
        type: Boolean, 
    },
    verifQuinta: {
        type: Boolean, 
    },
    verifSexta: {
        type: Boolean, 
    },
    verifSabado: {
        type: Boolean, 
    },
    verifDomingo: {
        type: Boolean, 
    },

    dia: {
        type: String, 
    },
    status:{
        type: Boolean, //-- Qual foi a atividade --//
        default: false
    }

});
AtividadeSchema.pre('save', async function(next) {
    //-- Calculando os minutos e setando --//
    if(this.dia == "segunda"){
        this.verifSegunda = true
    }
    if(this.dia == "terca"){
        this.verifTerca = true
    }
    if(this.dia == "quarta"){
        this.verifQuarta = true
    }
    if(this.dia == "quinta"){
        this.verifQuinta = true
    }
    if(this.dia == "sexta"){
        this.verifSexta = true
    }
    if(this.dia == "sabado"){
        this.verifSabado = true
    }
    if(this.dia == "domingo"){
        this.verifDomingo = true
    }

    next();
})
const Atividade = mongoose.model('atividades', AtividadeSchema);

module.exports = Atividade;