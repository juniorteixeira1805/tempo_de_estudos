const mongoose = require('mongoose')

const TagSchema = new mongoose.Schema({

    tags : {
        type : String,
    },

});


const Tag = mongoose.model('tags', TagSchema);

module.exports = Tag;