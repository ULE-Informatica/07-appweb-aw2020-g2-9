const express = require('express');
const router = express.Router();
var sequelize=require('../conexionBD');
const Sequelize = require('sequelize');


const models =require("../../models");
const etiquetas = models.Etiqueta;
const users = models.User;



router.get('/',async(req,res)=> {
    console.log("vista todos");
    
    //console.log(req.query);
    
    
    const etiqueta = await etiquetas.findAll()
        
          .then(function (etiqueta) {
            if (etiqueta) {
                console.log("resultados");
                
                
                res.send(etiqueta);
            } else {
                res.status(400).send('Error al obtener todos');
            }
        }).catch(function (error){
            res.status(400).send('Error al obtener todos'+
            error )
        });

} )  ;
router.get('/movie',async(req,res)=> {
    console.log("checando movie");
    
    console.log(req.query);
    
    
    const etiqueta = await etiquetas.findOne({
        include: [{
            model: models.Pelicula,
            where: { idApi: req.query.movie_id }
        }]
    }).then(function (etiqueta) {
            //if (etiqueta) {
                console.log("resultados de etiquetas");
                console.log(etiqueta);
                
                
                res.send(etiqueta);
            
        }).catch(function (error){
            res.status(400).send('Error al obtener todos'+
            error )
        });
        
} )  ;

router.put('/', async (req, res) => {
    console.log("modificar");
    
    console.log(req.body);
    
    
    const lista = await listas.update({
            nombre : req.body.nombre
        },{
        where: {
            id: req.body.id,
            userId: req.body.userId
        },
        }).then(function (lista) {
        if (lista) {
            res.send(lista);
        } else {
            res.status(400).send('Error al modificar lista');
        }
        
    }).catch(function (error){
        res.status(400).send('Error al tratar de modificar'+
        error )
    });
    
});

router.delete('/', async (req, res) => {
    console.log("borrando");
    
    //console.log(req.query);
    
    const lista = await listas.destroy({
        where: {
            id: req.query.id,
            userId: req.query.userId
        },
        }).then(function (usuario) {
        if (usuario) {
            res.send('Eliminado');
        } else {
            res.status(400).send('No se elimino');
        }
    }).catch(function (error){
        res.status(400).send('Error al eliminar'+
        error )
    });
    
});
module.exports = router;