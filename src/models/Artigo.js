const mongoose = require('mongoose')
const funcdata = require("../controller/tempoController")
const Schema = mongoose.Schema


const ArtigoSchema = new mongoose.Schema({
    dateCreater: {
        type: Date, //-- Data de criação --//
    },

    novaData: {
        type: String, //-- Data tratada para a view --//
    },

    grandeArea: {
        type: String, //-- A hora inicial --//
    },

    area: {
        type: String, //-- Hora final --//
    },

    tema: {
        type: String, //-- A hora inicial --//
    },

    descricao: {
        type: String, //-- A hora inicial --//
    },
    
    linkDoArtigo: {
        type: String, //-- A hora inicial --//
    },

    referencias: {
        type: String, //-- Minutos totais --//
    },

    autor: {
        type: Schema.Types.ObjectId, //-- Salva o id do dono do Artigo --//
        ref: "users"
    },

    gostou:{
        type: Number, //-- Qual foi a atividade --//
        default: 0
    },

    desgostou:{
        type: Number,
        default: 0
    }
});

//-- Antes de salvar --//
ArtigoSchema.pre('save', async function(next) {
    this.novaData = await funcdata.novadata(this.dateCreater)
})

const Artigo = mongoose.model('artigos', ArtigoSchema);

module.exports = Artigo;