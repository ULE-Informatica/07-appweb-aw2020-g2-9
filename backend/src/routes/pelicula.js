const express = require('express');
const router = express.Router();
var sequelize=require('../conexionBD');
const Sequelize = require('sequelize');


const models =require("../../models");
//Cambiar modelos se importan 

console.log('entre');
const peliculas = models.Pelicula;


router.post('/', async (req, res) => {
    console.log("creando entrada en tabla peliculas");
    console.log(req.body);
    console.log(req.body.etiquetaId); 
    
    var peliculaOserie = req.body.peliculaOserie;
    if(peliculaOserie==0){
        console.log("Es una película");
    }else{
        console.log("Es una serie");
    }

    if (req.body.etiquetaId==0)
    {
        return await peliculas.create({
            peliculaId: req.body.idApi,
            userId: req.body.id,
            isVista:1,
            peliculaOserie: peliculaOserie
        }).then(function (peliculas) {
            console.log(peliculas);
            if (peliculas) {
                console.log("Bien");
                
                res.send(peliculas);
            }
        }).catch(function (error){
            console.log(error);
            
            res.status(400).send('Error a crear registro '+
            error )
        });        
        
    }else if (req.body.etiquetaId==1)
    {
        return await peliculas.create({
            peliculaId: req.body.idApi,
            userId: req.body.id,
            isPendiente:1,
            peliculaOserie: req.body.peliculaOserie
        }).then(function (peliculas) {
            console.log(peliculas);
            if (peliculas) {
                console.log("Bien");
                
                res.send(peliculas);
            }
        }).catch(function (error){
            console.log(error);
            
            res.status(400).send('Error a crear registro '+
            error )
        });
        
    }else if (req.body.etiquetaId==2)
    {
        console.log("entre2");
        return await peliculas.create({
            peliculaId: req.body.idApi,
            userId: req.body.id,
            isFavorita:1,
            peliculaOserie: req.body.peliculaOserie
        }).then(function (peliculas) {
            console.log(peliculas);
            if (peliculas) {
                console.log("Bien");
                
                res.send(peliculas);
            }
        }).catch(function (error){
            console.log(error);
            
            res.status(400).send('Error a crear registro '+
            error )
        });
        
    }
    else if (req.body.calificacion){
        return await peliculas.create({
            peliculaId: req.body.idApi,
            calificacion: req.body.calificacion,
            userId: req.body.id,
            peliculaOserie: req.body.peliculaOserie
        }).then(function (peliculas) {
            console.log(peliculas);
            if (peliculas) {
                console.log("Bien");
                
                res.send(peliculas);
            }
        }).catch(function (error){
            console.log(error);
            
            res.status(400).send('Error a crear registro '+
            error )
        });
    }
});

router.put('/', async (req, res) => {
    console.log("modificar");
    
    console.log(req.body);
    
    
    if (req.body.etiquetaId==0)
    {
        const pelicula = await peliculas.update({
            isVista: Sequelize.literal('(isVista + 1)%2'),
        },{
        where: {
            peliculaId: req.body.idApi,
            userId: req.body.id
        },
        }).then(function (pelicula) {
            if (pelicula) {
                res.send(pelicula);
            } else {
                res.status(400).send('Error al modificar pelicula');
            }
        }).catch(function (error){
            res.status(400).send('Error al tratar de modificar'+
            error )
        });
    }
    else if (req.body.etiquetaId==1)
    {
        const pelicula = await peliculas.update({
            isPendiente: Sequelize.literal('(isPendiente + 1)%2'),
        },{
        where: {
            peliculaId: req.body.idApi,
            userId: req.body.id
        }
        })
       .then(function (pelicula) {
            if (pelicula) {
                res.send(pelicula);
            } else {
                res.status(400).send('Error al modificar pelicula');
            }
        }).catch(function (error){
            res.status(400).send('Error al tratar de modificar'+
            error )
        });
    }
    else if (req.body.etiquetaId==2)
    {
        const pelicula = await peliculas.update({
            isFavorita:Sequelize.literal('(isFavorita + 1)%2'),
        },{
        where: {
            peliculaId: req.body.idApi,
            userId: req.body.id
        },
        }).then(function (pelicula) {
            if (pelicula) {
                res.send(pelicula);
            } else {
                res.status(400).send('Error al modificar pelicula');
            }
        }).catch(function (error){
            res.status(400).send('Error al tratar de modificar'+
            error )
        });
    }
    else if (req.body.calificacion){
        const pelicula = await peliculas.update({
            calificacion: req.body.calificacion,
        },{
        where: {
            peliculaId: req.body.idApi,
            userId: req.body.id
        },
        }).then(function (pelicula) {
            if (pelicula) {
                res.send(pelicula);
            } else {
                res.status(400).send('Error al modificar pelicula');
            }
        }).catch(function (error){
            res.status(400).send('Error al tratar de modificar'+
            error )
        });
    }
});

router.get('/',async(req,res)=> {
    console.log(req.query);    
    const pelicula = await peliculas.findAll({
       where: { 
        peliculaId: req.query.movie_id,
           userId: req.query.id 
        }
    
    }).then(function (pelicula) {
            if (pelicula) {
                console.log("resultados de pelicula");
                res.send(pelicula);
            } else {
                res.status(400).send('Error al obtener todos');
            }
        }).catch(function (error){
            res.status(400).send('Error al obtener todos'+
            error )
        });
} )  ;

router.get('/log/:user',async(req,res)=> {
    console.log("aqui:\n");
    console.log(req.params.user);        
    console.log(usuarios);
    
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