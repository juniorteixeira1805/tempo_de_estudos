const mongoose = require('mongoose')

const Schema = mongoose.Schema


const MetaSchema = new mongoose.Schema({
    responsavel:{
        type: Schema.Types.ObjectId, //-- Salva o id do dono da atividade --//
        ref: "users"
    },

    dataMeta : {
        type : String,
    },

    atividade : {
        type : String,
    },

    privacidade : {
        type : Boolean,
        default: false
    }

});


const Meta = mongoose.model('metas', MetaSchema);

module.exports = Meta;