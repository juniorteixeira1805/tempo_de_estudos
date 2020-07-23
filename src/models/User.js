const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    dataVizualização:{
        type: Date
    },
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
        required: true
    },

    recado:{
        type: String,
        default: "Ainda não escrevi meu recado."
    },

    password:{
        type: String,
        required: true,
    },

    codResete:{
        type: String,
    },

    foto:{
        type: String,
        default: "https://i0.wp.com/www.techcult.com.br/wp-content/uploads/2017/03/perfil-twitter.png?resize=1024%2C1024&ssl=1"
    },

    validaEmail: {//-- Parametro para a view saber se ta online --//
        type: Boolean,
        default: false
    },

    privacidade: {
        type: Boolean, //-- Parametro para a view saber a privacidade --//
        default: true
    },

    dia: {
        type: Number, //-- minutos diarios --//
        default: 0
    },

    semana: {
        type: Number, //-- minutos semanais --//
        default: 0
    },

    mes: {
        type: Number, //-- minutos semanais --//
        default: 0
    },

    total: {
        type: Number, //-- minutos totais --//
        default: 0
    },

});

//-- Tratar antes de salvar --//
    UserSchema.pre('save', async function(next) {
    //-- Hasheando a senha --//
        const hash = await bcrypt.hash(this.password, 5);
        this.password = hash;

    //-- Setando avatar padrão, caso n venha nenhum do formulario de cadastro --//
        if(this.foto == ""){
            this.foto = "https://i0.wp.com/www.techcult.com.br/wp-content/uploads/2017/03/perfil-twitter.png?resize=1024%2C1024&ssl=1"
        }

    //-- Salvando a data atual para zerar dia, semana e mes --//
        var dataCriada = new Date()
        var diaDaSemana =  dataCriada.getDay()
        var aux = 7 - diaDaSemana
    //-- Setando dia, semana e mes --//
        this.semanaAnterior = aux + diaDaSemana

        this.diaAnterior = dataCriada.getDate()
        this.mesAnterior = dataCriada.getMonth()+1

        next();
    })

const User = mongoose.model('users', UserSchema);

module.exports = User;