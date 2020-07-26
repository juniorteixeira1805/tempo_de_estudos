const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema


const UserSchema = new mongoose.Schema({
    dataVizualização:{
        type: Date
    },

    name: {
        type: String,
        required: true,
    },

    curso:{
        type: String,
        required: true
    },

    cidade: {
        type: String,
        default: "Não informado."
    },

    bio: {
        type: String,
        default: "Não informado."
    },

    objetivo: {
        type: String,
        default: "Não informado."
    },

    email: {
        type: String,
        unique: true,
        required: true,
    },

    recado:{
        type: String,
        default: "Ainda não escrevi meu recado."
    },

    password:{
        type: String,
        required: true,
    },

    foto:{
        type: String,
        default: "https://i0.wp.com/www.techcult.com.br/wp-content/uploads/2017/03/perfil-twitter.png?resize=1024%2C1024&ssl=1"
    },

    validaEmail: {//-- Parametro para a view saber se ta online --//
        type: Boolean,
        default: false
    },

    codResete:{
        type: String,
    },

    privacidade: {
        sobre: {
            type: Boolean, //-- Parametro para a view saber a privacidade --//
            default: true
        },

        rank: {
            type: Boolean, //-- Parametro para a view saber a privacidade --//
            default: true
        },
    },

    historico: {
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

        totalAula: {
            type: Number, //-- minutos totais --//
            default: 0
        },

        totalEstudo: {
            type: Number, //-- minutos totais --//
            default: 0
        },

        totalLeitura: {
            type: Number, //-- minutos totais --//
            default: 0
        },

        totalPesquisa: {
            type: Number, //-- minutos totais --//
            default: 0
        },

        totalExercicio: {
            type: Number, //-- minutos totais --//
            default: 0
        },

        neutrinos: {
            type: Number,
            default: 0
        }
    },

    tempos : [{
        dateCreater: {
            type: Date, //-- Data de criação --//
        },
    
        novaData: {
            type: String, //-- Data tratada para a view --//
        },
    
        inicio: {
            type: String, //-- A hora inicial --//
            default: 0
        },
    
        termino: {
            type: String, //-- Hora final --//
            default: 0
        },
    
        tempoEstudado: {
            type: Number, //-- Minutos totais --//
            default: 0
        },
    
        tipo:{
            type: String, //-- Qual foi a atividade --//
        },
    
        subTipo:{
            type: String,
            default: "Não informado" //-- Qual foi a sub atividade --//
        },

        metodo:{
            type: String, //-- Qual foi a atividade --//
        }
    }],

    resumos: {
        type: Number,
        default: 0
    }
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

        next();
    })

const User = mongoose.model('users', UserSchema);

module.exports = User;