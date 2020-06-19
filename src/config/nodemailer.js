const nodemailer = require("nodemailer")

module.exports = {
    enviarEmail: async function(vertordeemails, quantidadesdeemails){
        var i = 0;
        while(i < quantidadesdeemails){
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                securet: true,
                auth: {
                    user: "devorion01@gmail.com",
                    pass: "Noiroved@1209"
                }
            });
            
            await transporter.sendMail({
                from: "Improdutiva Estudos LTDA <devorion01@gmail.com>",
                to: vertordeemails[i],
                subject: "Lembrete.",
                text: "",
                html: '<h3>Olá, estou aqui para lembrar a você que a vida não é nada facil. </h3><p>Se você quer esse diploma ou um cargo público, não esqueça que deve sentar e estudar. Para isto, estamos aqui. Entra na plataforma e vem estudar conosco. Não esquece de colocar seu tempo, tá?</p><p><b>Mas não esqueça, você está indo bem!<b></p><img src="https://abrilguiadoestudante.files.wordpress.com/2016/10/sofrendo-nos-estudos.gif"><a href="https://tempodeestudos--jrteixeira.repl.co/auth/login"><br><b>Improdutiva Estudos LTDA.<b/><a/>'
            }).then(message => {
                console.log(message);
            }).catch(err => {
                console.log(err)
            })
            i++
        }
        return true
    }
}