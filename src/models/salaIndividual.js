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

    notas: [{
        dateCreater : {
            type : Date,
            },

        corpo : {
            type : String,
            }
    }],

    metas: [{
        type: Schema.Types.ObjectId, //-- Salva o id do dono da atividade --//
        ref: "metas"
    }],

});


const Individual = mongoose.model('individuais', IndividualSchema);

module.exports = Individual;