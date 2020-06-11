const mongoose = require('mongoose')
const funcdata = require("../controller/tempoController")
const Schema = mongoose.Schema


const TempoSchema = new mongoose.Schema({
    dateCreater: {
        type: Date,
    },

    novaData: {
        type: String,
    },

    inicio: {
        type: String,
        default: 0
    },

    termino: {
        type: String,
        default: 0
    },

    tempoEstudado: {
        type: Number,
        default: 0
    },

    estudante: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },

    tipo:{
        type: String,
    }
});

TempoSchema.pre('save', async function(next) {
    this.tempoEstudado = await funcdata.tempoEstudado(this.inicio, this.termino)

    this.novaData = await funcdata.novadata(this.dateCreater)

    next();
})

const Tempo = mongoose.model('tempos', TempoSchema);

module.exports = Tempo;