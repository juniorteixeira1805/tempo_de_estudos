const mongoose = require('mongoose')

const Schema = mongoose.Schema


const MetaSchema = new mongoose.Schema({

    dateCreater : {
        type : Date,
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