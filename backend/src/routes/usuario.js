const express = require('express');
const router = express.Router();
var sequelize=require('../conexionBD');
const Sequelize = require('sequelize');


const models =require("../../models");
//Cambiar modelos se importan 






console.log('entre');
const usuarios = models.Datospersonales;


router.post('/nuevo_usuario', async (req, res) => {
    console.log(req.body);
    try {
        return await usuarios.create({
            Nombre: req.body.nombre,
            Apellido: req.body.apellido,
            
            
        }).then(function (usuarios) {
            console.log(usuarios);
            if (usuarios) {
                res.send(usuarios);
            } else {
                res.status(400).send('Error in insert new record');
            }
        });
    } catch (error) {
        res.status(400).send('Error in insert new record'+
        error )
    }    
});

router.get('/',async(req,res)=> {
    console.log("vista usuario");
    
    const usuario = await usuarios.findAll()
          .then(function (usuario) {
            if (usuario) {
                //console.log(usuario);
                
                res.send(usuario);
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
/*
const authMiddleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.status(401).send('You are not authenticated')
    } else {
      return next()
    }
  };

  router.get("/log", authMiddleware, (req, res) => {
    console.log(req.session.passport.user);
    
    /*
    let user = users.find(user => {
      return user.id === req.session.passport.user
    })
  
    console.log([user, req.session])
    
    res.send({ user: user })
  });
*/
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


router.put('/:id', async (req, res) => {
    console.log(req.body);
    // Change everyone without a last name to "Doe"
    var usuario=await usuarios.update({ Apellido: "Doe" }, {
        where: {
            Apellido: null
        }
    }).then(function (usuario) {
        if (usuario) {
            res.send(usuario);
        } else {
            res.status(400).send('Error al modificar');
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