const mongoose = require('mongoose')

const Schema = mongoose.Schema


const IndividualSchema = new mongoose.Schema({
    responsavel:{
            type: Schema.Types.ObjectId, //-- Salva o id do dono da atividade --//
            ref: "users"
    },
    
    nomeSala: {
        type: String,
    },

    resumos: [{
        dateCreater : {
            type : Date,
             },
        titulo : {
            type : String,
            },
        corpo : {
            type : String,
            }
    }],

    notas: [{
        dateCreater : {
            type : Date,
            },

        corpo : {
            type : String,
            }
    }],

    metas: [{
        dateCreater : {
            type : Date,
            },
        dataMeta : {
            type : String,
            },
        atividade : {
            type : String,
            },
        status : {
            type : Boolean,
            default: false
            }
    }],

    flashcards: [{
        dateCreater : {
            type : Date,
            },
        assunto : {
            type : String,
            },
        pergunta : {
            type : String,
            },
        resposta : {
            type : String,
            }
    }],

});


const Individual = mongoose.model('individuais', IndividualSchema);

module.exports = Individual;