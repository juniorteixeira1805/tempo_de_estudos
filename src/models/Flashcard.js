const mongoose = require('mongoose')

const Schema = mongoose.Schema


const FlashcardSchema = new mongoose.Schema({

    dateCreater : {
        type : Date,
    },

    responsavel:{
        type: Schema.Types.ObjectId, //-- Salva o id do dono da atividade --//
        ref: "users"
    },

    assunto : {
        type : String,
    },

    corpo: [{
        pergunta : {
            type : String,
        },
    
        resposta : {
            type : String,
        },
    }]


});


const Flashcard = mongoose.model('flashcards', FlashcardSchema);

module.exports = Flashcard;