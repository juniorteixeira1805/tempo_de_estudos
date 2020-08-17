const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema({

    dia : {
        type : String,
    },

});


const Data = mongoose.model('datas', DataSchema);

module.exports = Data;