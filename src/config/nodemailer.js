const nodemailer = require("nodemailer")

module.exports = {
    //-- Esta função é responsavel por mandar o e-mail do usuario para o suporte --//
    suporte: async function(usuario, assunto, texto, email){
        let transporter = nodemailer.createTransport({
            host: "smtp.umbler.com",
            port: 587,
            securet: false,
            auth: {
                user: "devorion@estude.live",
                pass: "Noiroved@1209"
            }
        });
        
        //-- Enviando o e-mail do usuario para o email do devorion --//
        transporter.sendMail({
            from: "Improdutiva Estudos LTDA <devorion@estude.live>",
            to: ["devorion01@gmail.com"],
            subject: assunto,
            text: texto+" De: "+usuario+ "; E-mail: "+email,
            html: ''
        }).then(message => {
            console.log("mensagem envada ao suporte" + message);
        }).catch(err => {
            console.log(err)
        })

        //-- Enviando o e-mail de notificação para Alice --//
        transporter.sendMail({
            from: "Improdutiva Estudos LTDA <devorion@estude.live>",
            to: ["aliicecs@ufrn.edu.br"],
            subject: "Informe",
            text: "Alice, uma mensagem de suporte foi enviado para o Devorion",
            html: ''
        }).then(message => {
            console.log("mensagem envada a Alice");
        }).catch(err => {
            console.log(err)
        })
    },

    //-- Esta função é responsavel por mandar o e-mail com o codigo de validação quando um usuario novo é cadastrado --//
    SendCode: function(email, codigo){
        let transporter = nodemailer.createTransport({
            host: "smtp.umbler.com",
            port: 587,
            securet: false,
            auth: {
                user: "devorion@estude.live",
                pass: "Noiroved@1209"
            }
        });
        
        transporter.sendMail({
            from: "Improdutiva Estudos LTDA <devorion@estude.live>",
            to: email,
            subject: "CÓDIGO DE VERIFICAÇÃO",
            text: "Seu código de validação: "+codigo,
            html: ''
        }).then(message => {
            console.log("Enviado email de validação: "+message);
        }).catch(err => {
            console.log(err)
        })
    },

    //-- Esta função é responsavel por mandar o e-mail com uma nova senha para o usuario, quando solicitado --//
    SendSenha: function(email, codigo){
        let transporter = nodemailer.createTransport({
            host: "smtp.umbler.com",
            port: 587,
            securet: false,
            auth: {
                user: "devorion@estude.live",
                pass: "Noiroved@1209"
            }
        });
        
        transporter.sendMail({
            from: "Improdutiva Estudos LTDA <devorion@estude.live>",
            to: email,
            subject: "NOVA SENHA",
            text: "Senha temporaria. Assim que possivel, vá em perfil -> Editar perfil e mude a senha. SENHA: "+codigo,
            html: ''
        }).then(message => {
            console.log("Senha enviada: "+message);
        }).catch(err => {
            console.log(err)
        })
    },

    //-- Esta função é responsavel por mandar o e-mail especifico de um determinado evento --//
    sendInfo: function(email, text){
        let transporter = nodemailer.createTransport({
            host: "smtp.umbler.com",
            port: 587,
            securet: false,
            auth: {
                user: "devorion@estude.live",
                pass: "Noiroved@1209"
            }
        });
        
        transporter.sendMail({
            from: "Improdutiva Estudos LTDA <devorion@estude.live>",
            to: email,
            subject: "SAUDAÇÕES, AMIGO.",
            text: text,
            html: ''
        }).then(message => {
            console.log(message);
        }).catch(err => {
            console.log(err)
        })
    }
}