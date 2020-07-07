const mongoose = require('mongoose')

const Schema = mongoose.Schema


const ColetivaSchema = new mongoose.Schema({
    estudantes: [{
        nome : {
            type : String,
            required: true
             },
        idade : {
            type : String,
            required: true
            },
}],

});


const Coletiva = mongoose.model('coletivas', ColetivaSchema);

module.exports = Coletiva;