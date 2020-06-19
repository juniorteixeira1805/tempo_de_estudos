//enviando email
const Func = require("../config/nodemailer")

setInterval(function(){
    var email = ["juniorteixeira1805@gmail.com","klaria6@gmail.com","kassia.milenateixeira@gmail.com","carolsilva58022@gmail.com","lidineide_nunes@hotmail.com","dayannetargino74@gmail.com","janeirode97@gmail.com","sayoolima@gmail.com","diegooliveira.msi@gmail.com","aliicecs@ufrn.edu.br","leticiacruz606@gmail.com","herlanecandido_@hotmail.com","vitor3souza@gmail.com","loiolamateus7@gmail.com","helloysaregiane@gmail.com","anaa.lusantos@gmail.com","adelsonunes.ribeiro@hotmail.com","marcosadriano740@gmail.com"]
    var data = new Date()
    console.log("Verificando hora de mandar email: " + data.getHours())
    if(data.getHours() == "16"){
    Func.enviarEmail(email, email.length)
    } }, 3600000);
    // 3600000 uma hora
