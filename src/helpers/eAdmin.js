module.exports = {
//-- está função serve para permitir que o usuario autenticado e com o email validado acesse as rotas --//
    eAdmin: function(req, res, next){
        if(req.isAuthenticated() && req.user.validaEmail == true){
            return next()
        }
        req.flash("success_msg", "Usuario não validou o email")
        res.redirect("/user/home")
    },
//-- está função serve para permitir que o usuario autenticado e sem o email validado acesse as apenas a pagina inicial e a pagina de perfil --//
    validarEmail: function(req, res, next){
        if(req.isAuthenticated()){
            return next()
            
        }
        req.flash("success_msg", "Usuario não autenticado")
        res.redirect("/user/login")
    }
}