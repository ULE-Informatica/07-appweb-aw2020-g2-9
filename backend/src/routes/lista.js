const express = require('express');
const router = express.Router();
var sequelize=require('../conexionBD');
const Sequelize = require('sequelize');
const models =require("../../models");
const listas = models.Lista;
const users = models.User;

router.post('/nuevo_lista', async (req, res) => {
    console.log("post lista");    
    console.log(req.body);
    
        return await listas.create({
            nombre: req.body.nombre,
            userId: req.body.id, 
            
            
        }).catch(function (error){
        res.status(400).send('Error in insert new record'+
        error)
    });    
});

router.get('/',async(req,res)=> {
    console.log("vista todosXXX");    
    console.log(req.query);    
    const lista = await listas.findAll({
        where: {
            userId: req.query.id
        },
        /*
        include: [{
            model: users,
            where: { id: req.query.id }
        }]
        */
        }).then(function (lista) {
            if (lista) {
                console.log("resultados listas all");
                //console.log(lista);
                res.send(lista);
            } else {
                res.status(400).send('Error al obtener todos');
            }
        }).catch(function (error){
            res.status(400).send('Error al obtener todos'+
            error )
        });
} )  ;

router.delete('/pelicula_lista', async (req, res) => {
    console.log("eliminar pelicula de lista");    
    console.log(req.body);    
    var encontrada=false;
    const listas= req.body.listas;
    //se consulta las listas donde esta la pelicula
    const listasIniciales=await sequelize.query("SELECT Listas.id as value FROM `ListaPelicula`,Listas WHERE peliculaId= :idPelicula AND Listas.userId=:idUser and Listas.id = ListaPelicula.listaId",
    { replacements: { idUser: req.body.id, idPelicula: req.body.idApi },
     type: sequelize.QueryTypes.SELECT }
    )
    .then((respuesta) => {
        console.log("Se encontro en las listas ");
        //console.log (respuesta);
        return respuesta;
    }).catch(function (error){
        res.status(400).send('Error al obtener todos'+
        error )
    });
    console.log(listasIniciales);
    console.log("lista inicial");
    console.log(listas);
    var arrInicial=[];
    for (var i=0; i<listasIniciales.length; i++) 
    {
        arrInicial.push(listasIniciales[i].value);
    }
    console.log("lista inicial");
    console.log(arrInicial);
    console.log(listas);
    //Se compara las listas recibidas 
    let difference = arrInicial.filter(x => !listas.includes(x));

    console.log(difference);
    for (var i=0; i<difference.length; i++) 
    {
        //Se verifica que no se encuentre en la base
        await sequelize.query("DELETE FROM `ListaPelicula` WHERE peliculaId= :idPelicula AND listaId=:idLista",
        { replacements: { idLista: difference[i], idPelicula:  req.body.idApi },
         type: sequelize.QueryTypes.DELETE }
        ).then((respuesta) => {
            console.log("Se elimino");
        }
        );
    }
});

router.post('/pelicula_lista', async (req, res) => {
    console.log("agrega pelicula a listas");    
    console.log(req.body);
    var encontrada=false;
    const listas= req.body.listas;
    //se consulta las listas donde esta la pelicula
    const listasIniciales=await sequelize.query("SELECT Listas.id as value FROM `ListaPelicula`,Listas WHERE peliculaId= :idPelicula AND Listas.userId=:idUser AND Listas.id = ListaPelicula.listaId",
    { replacements: { idUser: req.body.id, idPelicula: req.body.idApi },
     type: sequelize.QueryTypes.SELECT }
    )
    .then((respuesta) => {
        console.log("Se encontro en las listas ");
        //console.log (respuesta);
        return respuesta;
    }).catch(function (error){
        res.status(400).send('Error al obtener todos'+
        error )
    });
    if (listasIniciales)
    {
        console.log(listasIniciales);
        console.log("lista inicial");
        console.log(listas);
        var arrInicial=[];
        for (var i=0; i<listasIniciales.length; i++) 
        {
            arrInicial.push(listasIniciales[i].value);
        }
        console.log("lista inicial");
        console.log(arrInicial);
        console.log(listas);
        //Se compara las listas recibidas 
        let difference = arrInicial.filter(x => !listas.includes(x));
        console.log("diferencia");
        
        console.log(difference);
        for (var i=0; i<difference.length; i++) 
        {
            //Se verifica que no se encuentre en la base
            await sequelize.query("DELETE FROM `ListaPelicula` WHERE peliculaId= :idPelicula AND listaId=:idLista",
            { replacements: { idLista: difference[i], idPelicula:  req.body.idApi },
            type: sequelize.QueryTypes.DELETE }
            ).then((respuesta) => {
                console.log("Se elimino");
            }
            );
        }        
    }
    //insertar
    for (var i=0; i<listas.length; i++) 
    {
        console.log(listas[i]);
        //Se verifica que no se encuentre en la base
        await sequelize.query("SELECT * FROM `ListaPelicula` WHERE peliculaId= :idPelicula AND listaId=:idLista",
        { replacements: { idLista: listas[i], idPelicula: req.body.idApi },
         type: sequelize.QueryTypes.SELECT }
        ).then((respuesta) => {
            if (respuesta.length > 0) {
                console.log("Se encontro en la lista ");
                encontrada=true;
                console.log(respuesta);
            } else {
               console.log("No se encontró, por lo que hay que agregarla");
               encontrada=false;
            }
        }
        );
        if (!encontrada){
            await sequelize.query("INSERT INTO ListaPelicula (`listaId`, `peliculaId`, `isPelicula`) VALUES (:idLista, :idPelicula, :isPelicula)",
            { replacements: { idLista: listas[i], idPelicula: req.body.idApi, isPelicula: req.body.isPelicula },
            type: sequelize.QueryTypes.INSERT }
            ).then((res) => {
                console.log("Pelicula insertada a la lista");
                console.log(res);
                
            }).catch(function (error){
            res.status(400).send('Error in insert new record'+
            error)
            });
        }
    }
    
});

router.get('/allPeliculas',async(req,res)=> {
    console.log("Buscando las pelicula de la lista");
    console.log(req.query);
    
    //Lista con peliculas dado un usuario
    
    //peliculas dado una lista
    //SELECT listas.nombre, listapelicula.listaId, listapelicula.peliculaId FROM `ListaPelicula`,Listas WHERE listapelicula.listaId=4 and listas.id=listapelicula.listaId
    
    sequelize.query("SELECT Listas.id, Listas.nombre, ListaPelicula.listaId, ListaPelicula.peliculaId FROM `ListaPelicula`,Listas WHERE Listas.id=ListaPelicula.listaId and Listas.userId=:idUser ORDER by Listas.id",
        { replacements: { idUser: req.query.id },
         type: sequelize.QueryTypes.SELECT }
    )
    .then((respuesta) => {
        console.log("Se encontro en las listas con las peliculas");
        console.log (respuesta);

        //Separar para poder mostrar las distintas listas
        /* 
        if (respuesta.length > 0) {
            let mismaLista=true;
            let idLista=respuesta[0].listaId;
            var jsonData = {};
            var columnName = respuesta[0].listaId;
            
            respuesta.forEach(element => {

                if (idLista != element.listaId || idLista != respuesta[0].listaId)
                {   
                    console.log("entre");
                    
                    var columnName = element.nombre;
                }
                jsonData[columnName] = element.peliculaId;
                idLista = element.listaId;
            });
            console.log("Entre");
            
            console.log(jsonData);
            
        }
        */

        res.send(respuesta);
        //res.send(res);
    }).catch(function (error){
        res.status(400).send('Error al obtener todos'+
        error )
    });
    
});


router.get('/pelicula',async(req,res)=> {
    console.log("Buscando listas de la pelicula");
    console.log(req.query);
    sequelize.query("SELECT Listas.id, Listas.nombre FROM `ListaPelicula`,Listas WHERE peliculaId= :idPelicula AND Listas.userId=:idUser and Listas.id = ListaPelicula.listaId",
        { replacements: { idUser: req.query.id, idPelicula: req.query.movie_id },
         type: sequelize.QueryTypes.SELECT }
    )
    .then((respuesta) => {
        console.log("Se encontro en las listas ");
        console.log (respuesta);
        res.status(200).send(respuesta);
        //res.send(res);
    }).catch(function (error){
        res.status(400).send('Error al obtener todos'+
        error )
    });

    /*
    sequelize.query("SELECT * FROM `ListaPelicula` WHERE id= :idUser and peliculaId= :idPelicula",
        { replacements: { idUser: req.query.id, idPelicula: req.query.movie_id },
         type: sequelize.QueryTypes.SELECT }
    )
    .then((res) => {
        console.log("Se encontro en las listas ");
        console.log(res);
        res.status(200).send("todo bien");
        //res.send(res);
    }).catch(function (error){
        res.status(400).send('Error al obtener todos'+
        error )

    })
    */
    /*
    const lista = await listas.findAll({
        
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
        */
} )  ;




//get con parametros
router.get('/verLista',async(req,res)=> {
    console.log("vista especifico");
    console.log(req.params);
    console.log(req.query);
    sequelize.query("SELECT ListaPelicula.peliculaId,ListaPelicula.isPelicula  FROM `ListaPelicula` WHERE listaId=:idLista ORDER by ListaPelicula.id",
        { replacements: { idLista: req.query.idLista },
         type: sequelize.QueryTypes.SELECT }
    ).then(function (lista) {
            if (lista) {
                
                res.send(lista);
            } else {
                res.status(400).send('Error al obtener todos');
            }
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
    
    console.log(req.query);
    //Borra los registros donde este asosciado con la lista

    
    await sequelize.query("DELETE FROM `ListaPelicula` WHERE ListaPelicula.listaId = :idLista",
    { replacements: { idLista: req.query.id },
     type: sequelize.QueryTypes.SELECT }
    )
    .then((respuesta) => {
        console.log("Se encontro en las listas ");
        //console.log (respuesta);
        return respuesta;
    }).catch(function (error){
        res.status(400).send('Error al obtener todos'+
        error )
    });
    
    

    
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