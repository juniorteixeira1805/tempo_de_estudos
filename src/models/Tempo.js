const mongoose = require('mongoose')
const funcdata = require("../controller/tempoController")
const Schema = mongoose.Schema


const TempoSchema = new mongoose.Schema({
    dateCreater: {
        type: Date, //-- Data de criação --//
    },

    novaData: {
        type: String, //-- Data tratada para a view --//
    },

    inicio: {
        type: String, //-- A hora inicial --//
        default: 0
    },

    termino: {
        type: String, //-- Hora final --//
        default: 0
    },

    tempoEstudado: {
        type: Number, //-- Minutos totais --//
        default: 0
    },

    estudante: {
        type: Schema.Types.ObjectId, //-- Salva o id do dono do tempo --//
        ref: "users"
    },

    tipo:{
        type: String, //-- Qual foi a atividade --//
    },

    subTipo:{
        type: String,
        default: "Não informado" //-- Qual foi a sub atividade --//
    }
});

//-- Antes de salvar --//
TempoSchema.pre('save', async function(next) {
    //-- Calculando os minutos e setando --//
    this.tempoEstudado = await funcdata.tempoEstudado(this.inicio, this.termino)

    //-- Tratando data e setando nova data --//
    this.novaData = await funcdata.novadata(this.dateCreater)

    next();
})

const Tempo = mongoose.model('tempos', TempoSchema);

module.exports = Tempo;