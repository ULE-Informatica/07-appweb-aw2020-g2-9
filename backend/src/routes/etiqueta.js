const express = require('express');
const router = express.Router();
var sequelize=require('../conexionBD');
const Sequelize = require('sequelize');

const models =require("../../models");
const peliculas = models.Pelicula;
const users = models.User;


/*
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
*/
router.get('/movie',async(req,res)=> {
    console.log("checando movie");
    
    console.log(req.query);
    
    
    sequelize.query('SELECT * FROM Peliculas WHERE peliculaId = :peliculaId ',
    { replacements: { peliculaId: req.query.movie_id }, type: sequelize.QueryTypes.SELECT }
    
    ).then(function (p) {
            //if (etiqueta) {
                console.log("resultados de etiquetas");
                console.log(p);
                
                
                res.send(p);
            
        }).catch(function (error){
            res.status(400).send('Error al obtener todos'+
            error )
        });
        
} )  ;

router.get('/vistas', async(req, res) =>{

    console.log("obteniendo películas o series vistas.");
    sequelize.query('SELECT * FROM Peliculas WHERE userId = :userId AND isVista = :vista AND peliculaOserie = :peliculaOserie',
    {replacements: {userId: req.query.userId, vista: 1, peliculaOserie: req.query.peliculaOserie}, 
    type: sequelize.QueryTypes.SELECT}
    ).then(function(lista){
        if(lista){
            console.log("resultados:");
            console.log(lista);
            res.send(lista);
        }else{
            res.status(400).send("error al obtener películas o series vistas.");
        }        
    }).catch(function (error){
        res.status(400).send('error al obtener películas o series vistas: ' + error);
    });
});

router.get('/pendientes', async(req, res) =>{

    console.log("obteniendo películas o series pendientes.");
    sequelize.query('SELECT * FROM Peliculas WHERE userId = :userId AND isPendiente = :pendiente AND peliculaOserie = :peliculaOserie',
    {replacements: {userId: req.query.userId, pendiente: 1, peliculaOserie: req.query.peliculaOserie}, 
    type: sequelize.QueryTypes.SELECT}
    ).then(function(lista){
        if(lista){
            console.log("resultados:");
            console.log(lista);
            res.send(lista);
        }else{
            res.status(400).send("error al obtener películas o series pendientes.");
        }        
    }).catch(function (error){
        res.status(400).send('error al obtener películas o series pendientes: ' + error);
    });
});

router.get('/favoritas', async(req, res) =>{

    console.log("obteniendo películas o series favoritas.");
    sequelize.query('SELECT * FROM Peliculas WHERE userId = :userId AND isFavorita = :favorita AND peliculaOserie = :peliculaOserie',
    {replacements: {userId: req.query.userId, favorita: 1, peliculaOserie: req.query.peliculaOserie}, 
    type: sequelize.QueryTypes.SELECT}
    ).then(function(lista){
        if(lista){
            console.log("resultados:");
            console.log(lista);
            res.send(lista);
        }else{
            res.status(400).send("error al obtener películas o series favoritas.");
        }        
    }).catch(function (error){
        res.status(400).send('error al obtener películas o series favoritas: ' + error);
    });
});

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