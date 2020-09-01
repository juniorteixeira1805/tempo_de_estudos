const mongoose = require('mongoose')

const Schema = mongoose.Schema


const ColetivaSchema = new mongoose.Schema({
    dateCreaterSala:{
        type: Date
    },

    responsavel:{
            type: Schema.Types.ObjectId, //-- Salva o id do dono da atividade --//
            ref: "users"
    },
    
    nomeSala: {
        type: String,
    },

    feed: [{
        dateCreater : {
            type : Date,
            },

        participante: {
            type: Schema.Types.ObjectId, //-- Salva o id do dono da atividade --//
            ref: "users",
        },

        texto : {
            type : String,
            }
    }],

    participantes : [{
        participante: {
            type: Schema.Types.ObjectId, //-- Salva o id do dono da atividade --//
            ref: "users",
        },

        meta: {
            type: String
        }
    }],

});


const Coletiva = mongoose.model('coletivas', ColetivaSchema);

module.exports = Coletiva;