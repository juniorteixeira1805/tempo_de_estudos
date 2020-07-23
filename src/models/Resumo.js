const mongoose = require('mongoose')

const Schema = mongoose.Schema


const ResumoSchema = new mongoose.Schema({

    dateCreater : {
        type : Date,
    },

    responsavel:{
        type: Schema.Types.ObjectId, //-- Salva o id do dono da atividade --//
        ref: "users"
    },

    Tag : {
        type: Schema.Types.ObjectId, //-- Salva o id do dono da atividade --//
        ref: "tags"
    },

    assunto : {
        type : String,
    },

    titulo : {
        type : String,
    
    },
    corpo : {
        type : String,
    },

    ref : {
        type : String,
    },

    privacidade: {
        type : Boolean,
        default: true
    }

});


const Resumo = mongoose.model('resumos', ResumoSchema);

module.exports = Resumo;