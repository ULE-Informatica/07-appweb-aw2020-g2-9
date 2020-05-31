const express = require('express');
const router = express.Router();
var sequelize=require('../conexionBD');
const Sequelize = require('sequelize');

const passport = require('passport');


console.log('entrex');




router.post('/', async (req, res,next) => {

    passport.authenticate('local.signup',(err, user, info) => {
    if (err) {
      console.log("error registo");
     return next(err);
    }
    console.log("USUARIO REGISTRADO");
    console.log(user);
    
    res.send("USUARIO REGISTRADO");

            /*{ 

    
            successRedirect: 'login/bien',
            failureRedirect: '/loginF',
            failureFlash: true 
        */
    
        
        /*
        const p = await pass.encryptPassword(req.body.password);
        return await usuarios.create({
            email: req.body.email,
            password: p
        }).then(function (usuarios) {
            console.log(usuarios);
            if (usuarios) {
                res.send(usuarios);
            } else {
                res.status(400).send('Error al crear un nuevo usuario');
            }
        }).catch(function (error){
            res.status(400).send('Error al crear un nuevo usuario'+
            error )
        });
        */
    
})(req, res, next) 
});
router.get('/loginF',async(req,res)=> {
    console.log("jhk");
    
    res.status(400).send('No se creo');
    
} );
router.get('/bien',async(req,res)=> {
    res.status(200).send('Entramos logeados');
});
/*
router.get('/',async(req,res)=> {
    
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
        
} );
*/

//get con parametros
router.get('/muestra/:id',async(req,res)=> {

    console.log(req+ "sdsada");
    /*
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
*/
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