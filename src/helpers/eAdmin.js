module.exports = {
    eAdmin: function(req, res, next){
        if(req.isAuthenticated()){
            return next()
            
        }
        req.flash("success_msg", "Usuario não autenticado")
        res.redirect("/")
    }
}