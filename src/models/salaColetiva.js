const mongoose = require('mongoose')

const Schema = mongoose.Schema


const ColetivaSchema = new mongoose.Schema({
    dateCreater: {
        type: Date, //-- Data de criação --//
    },

    estudantes: {
        type: [Schema.Types.ObjectId], //-- Salva o id do dono do Coletiva --//
        ref: "users"
    },

});


const Coletiva = mongoose.model('coletivas', ColetivaSchema);

module.exports = Coletiva;