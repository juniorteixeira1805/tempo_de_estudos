//--Importando os modulos--//
const express = require('express');

const Coletiva = require('../models/salaColetiva');

const router = express.Router();

router.post('/registerColetiva', async (req, res) => {

    //--Criando novo usuario--//
    try{
        const novaColetiva = { //-- Recebendo valores --//
            estudantes: {
                nome: req.body.nome,
                idade: req.body.idade,
            }

        }

        new Coletiva(novaColetiva).save().then( async () => {
            console.log(" Criou nova sala")
            //req.flash("sucess_msg", "sala cadastrada") // apresenta na tela a msg de salvo
            //res.redirect("/artigo/meusArtigos") //redireciona para a pagina
        }).catch((err) => {
            console.log(err)
           // req.flash("error_msg", "Houve um erro ao cadastrar" + err) // apresenta uma mensagem de erro
           // res.redirect("/artigo/meusArtigos") // redireciona para a pagina
        })


    } catch(err) {
        //req.flash("error_msg", "Erro ao cadastrar artigo.")
        //res.redirect("/")
        console.log("Deu erro ao tentar cadastrar: ", err)
    }
});

router.post('/addMembro', async (req, res) => {
        
        try{
            
            const id = req.body.id
            console.log(id)
            Coletiva.findOneAndUpdate({ _id: id }, {$push: { estudantes: {nome: req.body.nome, idade: req.body.idade} }}).then(() =>{}).catch((err) => {
                console.log(err)
            })
            
            console.log("adicionou membro")
            //const id = req.params.id;
            //await Coletiva.findOne({_id: id}, { $push: { estudantes: novoMembro } })

            //console.log("adicionou membro")
           // req.flash("sucess_msg", "artigo editado")
           // res.redirect("/artigo/meusArtigos")
        } catch(err){
            console.log("Deu erro ao adicionar membro: " + err)
        }

    });
    
    /*
<ul>
  {{#each salas}}
    {{#each estudantes}}
        {{nome}}{{idade}}
    {{/each}}
  {{/each}}
</ul>
    */

module.exports = router