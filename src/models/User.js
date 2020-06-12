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
        default: "https://i0.wp.com/www.techcult.com.br/wp-content/uploads/2017/03/perfil-twitter.png?resize=1024%2C1024&ssl=1"
    },

    verificadorOnline: {
        type: Boolean,
        default: false
    },

    diaAnterior: {
        type: Number,
    },

    semanaAnterior: {
        type: Number,
    },

    mesAnterior: {
        type: Number,
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

    if(this.foto == ""){
        this.foto = "https://i0.wp.com/www.techcult.com.br/wp-content/uploads/2017/03/perfil-twitter.png?resize=1024%2C1024&ssl=1"
    }

    var dataCriada = new Date()
    var diaDaSemana =  dataCriada.getDay()
    var aux = 7 - diaDaSemana

    this.semanaAnterior = aux + diaDaSemana

    this.diaAnterior = dataCriada.getDate()
    this.mesAnterior = dataCriada.getMonth()+1

    next();
})

const User = mongoose.model('users', UserSchema);

module.exports = User;