const mongoose = require('mongoose')

const DiaSchema = new mongoose.Schema({

    dataAtual : {
        type : Date,
    },

});


const Dia = mongoose.model('dias', DiaSchema);

module.exports = Dia;