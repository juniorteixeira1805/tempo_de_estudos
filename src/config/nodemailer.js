const nodemailer = require("nodemailer")

module.exports = {
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
        
        transporter.sendMail({
            from: "Improdutiva Estudos LTDA <devorion@estude.live>",
            to: ["devorion@estude.live"],
            subject: assunto,
            text: texto+" De: "+usuario+ "; E-mail: "+email,
            html: ''
        }).then(message => {
            console.log("mensagem envada ao suporte");
        }).catch(err => {
            console.log(err)
        })

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