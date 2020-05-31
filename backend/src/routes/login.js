const express = require('express');
const router = express.Router();
var sequelize=require('../conexionBD');
const Sequelize = require('sequelize');
const passport = require('passport');
const path = require('path');
const models =require("../../models");
const jwt = require("jsonwebtoken")
process.env.SECRET_KEY = 'secret'
/*
const usuarios = sequelize.define('usuarios', {
    Nombre: Sequelize.STRING,
    Apellido: Sequelize.STRING
});
*/
router.get('/getVariable',async(req,res)=> {
    console.log("get variable");
    
    console.log(req.user);
    
    res.send(req.user);
});


router.post('/', async (req, res,next) => {
    
    console.log("qwerty");
    console.log(req.body.id);
    
    /*
    passport.authenticate('local.signin', {
        successRedirect: '/login/bien',
        failureRedirect: '/login/',
        failureFlash: true 
    }
    )(req, res,next);
    */
   
    
  
   passport.authenticate("local.signin", (err, user, info) => {
    if (err) {
    console.log("entro a error");
    
      return next(err);
    }
    if (!user) {
        console.log(  "No usuario" );
      console.log(req.flash('message')[0]);
      req.flash('message', req.flash('message')[0]);
      //return res.status(400).send([user, mensaje, info]);
    }
    else{
        req.login(user, function(err) {
            if (err) { return next(err); }
            console.log(req.user);
            
            const payload = {
                id:req.user.id,
                email: req.user.email
            }

            console.log("paso longin");
            let token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: 1440
            }
            );
            
            
            //return res.status(200).send([req.user, "Loggin in", token]);
            res.send(token);
            //return res.status(200).send([req.user, "Loggin in", req.app.locals]);
          });
        
    }
    
    })(req, res, next);
    
});


router.get('/log/',async(req,res)=> {
    
    
    
    console.log("aqui:\n");
        console.log(req.params.user);
        console.log(req.user);
        
        console.log(req.app.locals);
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





router.get('/loginF',async(req,res)=> {
    console.log("quiovo");
    
    //res.render(path.join( 'C:/Users/MARCO ANTONIO/Documents/uni/ule/aplicaciones-web/curso/mysql-frontend/mysql-frontend/src/views/Usuario.vue'));
    //res.renderVue('Usuario.vue', data, req.vueOptions);
    //res.redirect('http://localhost:8081/Usuario');
    
} );
router.get('/logout', function(req, res) {
    console.log("cerrando:");
    req.logout();
    console.log(req.user);
    res.send("Log out");
    //res.redirect('/login');
});

router.get('/bien/:user',async(req,res)=> {
    console.log("tons:");
    console.log(req.params.user);
    
    //console.log(req.res.req.sessionStore.sessions.kKZrms4SArXQ1Hj0mNUrh20pkAw9BPUK);

    



    
    res.status(200).send('Entramos logeados');
    /*
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
        */
} );


module.exports = router;