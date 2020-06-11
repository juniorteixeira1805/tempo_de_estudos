module.exports = {
    eAdmin: function(req, res, next){
        if(req.isAuthenticated()){
            return next()
            
        }

        req.flash("error_msg", "Usuario não autenticado")
        res.redirect("/auth/login")
    }
}