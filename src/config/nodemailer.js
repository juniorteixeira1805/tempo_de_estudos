const nodemailer = require("nodemailer")

module.exports = {
    enviarEmail: async function(vertordeemails, vertordenome, quantidadesdeemails){
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
                from: "e-mail marketing - improdutiva estudos LTDA <devorion01@gmail.com>",
                to: vertordeemails[i],
                subject: vertordenome[i]+", a improdutiva estudos LTDA tem novidades para você-",
                text: "",
                html: '<p>Olá'+vertordenome[i]+', tudo bem? Essa semana temos mais uma novidade para você em nossa plataforma, agora contamos com uma nova função para auxiliar você a manter o foco e aumentar a sua produtividade.A sala de tempo agora possui também a técnica de pomodoro e nele você pode optar pelos métodos iniciante, avançado e livre: No método iniciante, você terá 25 min de foco e 5 min para descansar. Na opção Avançado, você ficará estudando por 50 min e descansará por 10 min. Por fim, no método livre você poderá estudar o tempo que quiser e descansar  o quanto quiser, é só você mesmo registrar no temporizador o tempo que estudará e o tempo que descansará.<p>'
            }).then(message => {
                console.log(message);
            }).catch(err => {
                console.log(err)
            })
            i++
        }
        return true
    },

    suporte: async function(usuario, assunto, texto, email){
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            securet: true,
            auth: {
                user: "devorion01@gmail.com",
                pass: "Noiroved@1209"
            }
        });
        
        transporter.sendMail({
            from: "Improdutiva Estudos LTDA <devorion01@gmail.com>",
            to: ["devorion01@gmail.com"],
            subject: assunto,
            text: texto+" De: "+usuario+ "; E-mail: "+email,
            html: ''
        }).then(message => {
            console.log("mensagem envada ao suporte");
        }).catch(err => {
            console.log(err)
        })

        transporter.sendMail({
            from: "Improdutiva Estudos LTDA <devorion01@gmail.com>",
            to: ["aliicecs@ufrn.edu.br"],
            subject: "Informe",
            text: "Alice, uma mensagem de suporte foi enviado para o Devorion",
            html: ''
        }).then(message => {
            console.log("mensagem envada a Alice");
        }).catch(err => {
            console.log(err)
        })
    }


}
/*
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    securet: true,
    auth: {
        user: "devorion01@gmail.com",
        pass: "Noiroved@1209"
    }
});

transporter.sendMail({
    from: "Improdutiva Estudos LTDA <devorion01@gmail.com>",
    to: ["juniorteixeira1805@gmail.com", "klaria6@gmail.com", "kassia.milenateixeira@gmail.com", "carolsilva58022@gmail.com", "janeirode97@gmail.com", "sayoolima@gmail.com", "diegooliveira.msi@gmail.com","aliicecs@ufrn.edu.br","leticiacruz606@gmail.com","vitor3souza@gmail.com","loiolamateus7@gmail.com","helloysaregiane@gmail.com", "anaa.lusantos@gmail.com", "adelsonunes.ribeiro@hotmail.com", "marcosadriano740@gmail.com"],
    subject: "Artigos e trabalhos para divulgação científica.",
    text: "",
    html: '<h1 class="mt-4 text-light">Agora você pode fazer divulgação científica em nossa plataforma.</h1><p class="lead text-light">Aqui você pode cadastrar seu artigo e trabalho acadêmico. O artigo poderá ser simples. Você pode explicar, científicamente, qualquer assunto que sabe com a devida referência, para validar seu trabalho e não gerar nóticias falsas.</p><p class="lead text-light">Seus artigos cadastrados serão públicos e qualquer pessoa poderá ter acesso a ele. Além disso, as pessoas cadastradas na plataforma poderão indicar se gostaram ou não anonimamente.</p><p class="lead text-light">Essa funcionalidade foi implementada no intuito de levar explicaçãoes científicas para as pessoas, ou seja, fazer divulgação cientifica. Além disso, todo acadêmico já passou perrengue para fazer algum trabalho de fim de semestre e depois, nunca mais utilizou este trabalho. Sendo assim, geramos uma utilidade para esse seu trabalho que está jogado sem utilidade.</p><p>Então entra na plataforma e cadastra teus artigos e trabalhos!</p><h3>Autor da ideia desta funcionalidade: Diego Oliveira Da Silva</h3><a href="https://tempodeestudos--jrteixeira.repl.co/auth/login"><br><b>Improdutiva Estudos LTDA.<b/><a/><br><img src="https://abrilguiadoestudante.files.wordpress.com/2016/10/sofrendo-nos-estudos.gif">'
}).then(message => {
    console.log(message);
}).catch(err => {
    console.log(err)
})


let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    securet: true,
    auth: {
        user: "devorion01@gmail.com",
        pass: "Noiroved@1209"
    }
});

transporter.sendMail({
    from: "Improdutiva Estudos LTDA <devorion01@gmail.com>",
    to: ["juniorteixeira1805@gmail.com", "klaria6@gmail.com", "kassia.milenateixeira@gmail.com", "carolsilva58022@gmail.com", "janeirode97@gmail.com", "sayoolima@gmail.com", "diegooliveira.msi@gmail.com","aliicecs@ufrn.edu.br","leticiacruz606@gmail.com","vitor3souza@gmail.com","loiolamateus7@gmail.com","helloysaregiane@gmail.com", "anaa.lusantos@gmail.com", "adelsonunes.ribeiro@hotmail.com", "marcosadriano740@gmail.com", "juliofreitaspro@gmail.com"],
    subject: "Lembrete",
    text: "",
    html: '<h3>Olá, estou aqui para lembrar a você que a vida não é nada fácil. </h3><p>Se você quer esse diploma ou um cargo público, não esqueça que deve sentar e estudar. Para isto, estamos aqui. Entra na plataforma e vem estudar conosco. Não esquece de colocar seu tempo, tá?</p><p><b>Mas Lembre-se, VOCÊ ESTÁ INDO BEM!<b></p><img src="https://abrilguiadoestudante.files.wordpress.com/2016/10/sofrendo-nos-estudos.gif"><a href="https://tempodeestudos--jrteixeira.repl.co/auth/login"><br><b>Improdutiva Estudos LTDA.<b/><a/>'
}).then(message => {
    console.log(message);
}).catch(err => {
    console.log(err)
})
*/