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
    to: ["juniorteixeira1805@gmail.com", "klaria6@gmail.com", "kassia.milenateixeira@gmail.com", "carolsilva58022@gmail.com", "lidineide_nunes@hotmail.com", "dayannetargino74@gmail.com", "janeirode97@gmail.com", "sayoolima@gmail.com", "diegooliveira.msi@gmail.com","aliicecs@ufrn.edu.br","leticiacruz606@gmail.com","herlanecandido_@hotmail.com","vitor3souza@gmail.com","loiolamateus7@gmail.com","helloysaregiane@gmail.com", "anaa.lusantos@gmail.com", "adelsonunes.ribeiro@hotmail.com", "marcosadriano740@gmail.com"],
    subject: "Sistema de recompensa.",
    text: "",
    html: '<p class="mt-4 text-light">A plataforma possui níveis de patentes e respectivos avatares. Todos estudantes começam com o nível 1 e progride em uma quantidade de minutos de atividades, podendo chegar ao Nível 8.<img src="https://i.pinimg.com/originals/76/6a/ed/766aed69f86d2f4c4da24d1490ca267a.gif"/></p><h2 class="mt-4 text-light">Como faça para progredir?</h2><p class="mt-4 text-light">Para progredir de patente, do nível 1 ao nível 6, você terá que práticar 600 minutos de atividades para cada nível. Já nas ultimas dois níveis, esse valor sobe para 700 minutos.</p><h2 class="mt-4 text-light">E os avatares?</h2><p class="mt-4 text-light">Para cada nível, você ganhará um avatar que ficará no seu perfil indicando o seu nível. Entretando, caso deseje ver os avatares que você já ganhoiu basta ir em home->Perfil->Estátistica e Conquista->Conquistas.</p><h2 class="mt-4 text-light">Por quanto tempo dura os avatares e os Níveis?</h2><p class="mt-4 text-light">O sistema de Níveis dura por um mês, sempre que o mês acabar e suas horas mensais retornarem a 0, você voltará para o nível 1</p>'
}).then(message => {
    console.log(message);
}).catch(err => {
    console.log(err)
})

*/