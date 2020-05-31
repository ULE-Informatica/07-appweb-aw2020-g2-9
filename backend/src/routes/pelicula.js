const express = require('express');
const router = express.Router();
var sequelize=require('../conexionBD');
const Sequelize = require('sequelize');


const models =require("../../models");
//Cambiar modelos se importan 






console.log('entre');
const peliculas = models.Pelicula;


router.post('/', async (req, res) => {
    console.log(req.body);
    
        return await peliculas.create({
            idApi: req.body.idApi,
            etiquetaId: req.body.etiquetaId,
            userId: req.body.id
            
        }).then(function (peliculas) {
            console.log(peliculas);
            if (peliculas) {
                console.log("Bien");
                
                res.send(peliculas);
            }
        }).catch(function (error){
            res.status(400).send('Error al obtener todos'+
            error )
        });
    

});

router.get('/',async(req,res)=> {
    console.log(req.query);
    
    
    const pelicula = await peliculas.findAll({
       where: { 
           idApi: req.query.movie_id,
           userId: req.query.id 
        }
    
    }).then(function (pelicula) {
            if (pelicula) {
                console.log("resultados de pelicula");
                console.log(pelicula);
                res.send(pelicula);
            } else {
                res.status(400).send('Error al obtener todos');
            }
        }).catch(function (error){
            res.status(400).send('Error al obtener todos'+
            error )
        });
        
} )  ;





//get con parametros
router.get('/muestra/:id',async(req,res)=> {
    const idUser=req.params.id;
    console.log(req.params);
    
        const usuario = await usuarios.findOne({
            where: {
                id: idUser
            }
          })
          .then(function (usuario) {
            if (usuario) {
                //console.log(usuario);
                
                res.send(usuario);
            } else {
                res.status(400).send('Error in insert new record');
            }
        }).catch(function (error){
            res.status(400).send('Error in insert new record'+
            error )
        });

} );

router.get('/log/:user',async(req,res)=> {
    
    
    
    console.log("aqui:\n");
        console.log(req.params.user);
        
    console.log(usuarios);
        
        //console.log(req.app.locals);
        //console.log(req.app.locals.success);
        
    
    
    console.log();
    console.log();
    
        const usuario = await usuarios.findOne({
            where: {
                userId: req.params.user
            }
          })
          .then(function (usuario) {
            if (usuario) {
                //console.log(usuario);
                
                res.send(usuario);
            } else {
                res.status(400).send('Error in insert new record');
            }
        }).catch(function (error){
            res.status(400).send('Error in insert new record'+
            error )
        });

} );

router.put('/', async (req, res) => {
    console.log("modificar");
    
    console.log(req.body);
    
    
    const pelicula = await peliculas.update({
            nombre : req.body.nombre
        },{
        where: {
            id: req.body.id,
            userId: req.body.userId
        },
        }).then(function (pelicula) {
        if (pelicula) {
            res.send(pelicula);
        } else {
            res.status(400).send('Error al modificar lista');
        }
        
    }).catch(function (error){
        res.status(400).send('Error al tratar de modificar'+
        error )
    });
    
});


router.delete('/:id', async (req, res) => {
    console.log(req.body);
    
    
    var usuario=await usuarios.destroy({ 
        where: {
            id: req.params.id
        }
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