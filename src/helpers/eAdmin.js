module.exports = {
    eAdmin: function(req, res, next){
        if(req.isAuthenticated() && req.user.validaEmail == true){
            return next()
        }
        req.flash("success_msg", "Usuario não validou o email")
        res.redirect("/user/home")
    },
    validarEmail: function(req, res, next){
        if(req.isAuthenticated()){
            return next()
            
        }
        req.flash("success_msg", "Usuario não autenticado")
        res.redirect("/")
    }
}