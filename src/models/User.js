const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        unique: true,
        required: true,
    },

    curso:{
        type: String,
    },

    password:{
        type: String,
        required: true,
    },

    foto:{
        type: String,
    },

    status: {
        type: String,
        default: "offline"
    },

    dia: {
        type: Number,
        default: 0
    },

    semana: {
        type: Number,
        default: 0
    },

    mes: {
        type: Number,
        default: 0
    },

    total: {
        type: Number,
        default: 0
    },
});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 5);
    this.password = hash;

    next();
})

const User = mongoose.model('users', UserSchema);

module.exports = User;