//paquete para autenticarte en el login
const passport =require('passport');
const LocalStrategy =require('passport-local').Strategy;
var sequelize=require('../conexionBD');
const Sequelize = require('sequelize');
const pass=require('../lib/password');

const models =require("../../models");

const users = models.User;

const usuarios = models.Datospersonales;

/*
const users = sequelize.define('users', {
    password: Sequelize.STRING,
    email: Sequelize.STRING
});

const usuarios = sequelize.define('usuarios', {
    Nombre: Sequelize.STRING,
    Apellido: Sequelize.STRING,
    userId: Sequelize.INTEGER
});
*/



passport.use('local.signin',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done ) => {
    console.log(req.body);
    
    const user = await users.findOne({
        where: {
            email: username
        },
        //include: usuarios
    });
    if (user){
        const valido= await pass.matchPassword(password, user.password);
        if (valido){
            //console.log(usuario.Usuario.Nombre);
            
            console.log("v:a");
            //req.flash('success','Bienvenido'+ usuario.Usuario.Nombre);

            req.app.locals.success = 'Bienvenido ';
            //req.app.locals.user=user.Usuario;
            //console.log(req.flash('success'));
            //console.log(req.app.locals);

            try{

              return done(null, user);
            }
            catch(e){ 
              console.log("error aca");
              
              console.log(e);
              
            }
        }else
        {
            console.log("b");
            done(null, false, req.flash('message','Contraseña incorrecta'))
            //done(null, false, { message: 'Incorrect username.' })
        }
    }else{
        return done (null, false,'message', "Correo invalido");
    }
            
  }
    

));




passport.use('local.signup',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    }, async(req, username, password, done) => {

        const { nombre,apellido } = req.body;
        //console.log( nombre);
        
        password = await pass.encryptPassword(password);
        const user=await users.create({
            email: username,
            password: password
        })
        .catch(function(e) {
            console.log("error 1");
            
            console.log(e); // "oh, no!"
        }).then(res =>{
            const res2=usuarios.create({
                Nombre: nombre,
                Apellido: apellido,
                userId: res.id
            }).catch(function(e) {
                console.log("error 2");
                console.log(e); // "oh, no!"
            }).then(res =>{
                console.log("Se creo datos personales");
                
            });
        
        });
        
        
        console.log("se retorna");
        console.log(user);
        
        
        /*
        Bar.create({
            name: 'My Bar',
            fooId: 5
          });
          */

        return done(null,user );
    } 
    
));
passport.serializeUser((u,done) => {
    console.log("se guardo en sesion:"+ u.id);
    
    return done(null, u.id);
});
passport.deserializeUser((id, done) =>{
  console.log("se borra:"+ id);
    const f= users2.findOne({
        where: {
            id: id
        }
      });
      return  done(null, f);
});
