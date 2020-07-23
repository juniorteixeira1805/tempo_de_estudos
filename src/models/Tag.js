const mongoose = require('mongoose')

const Schema = mongoose.Schema


const TagSchema = new mongoose.Schema({

    tags : {
        type : String,
    },

});


const Tag = mongoose.model('tags', TagSchema);

module.exports = Tag;