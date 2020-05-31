var expressVue = require("express-vue");
const express = require('express');
var cors = require('cors'); //permite solicitudes de un servidor externo e impedir el bloqueo
var flash = require('connect-flash');
const app = express();
const passport = require('passport');
require('./src/lib/passport')
const morgan = require('morgan');
// Para acceder al directorio actual
const path = require('path');

//settings
app.use(morgan('tiny'));
app.set('puerto', process.env.PORT || 3000);


/*
const vueOptions = {
  rootPath: path.join(__dirname,  '../mysql-frontend/mysql-frontend/src/views')
  ,
  head: {
      title: 'Hello this is a global title',
      scripts: [
          { src: 'https://example.com/script.js' },
      ],
      styles: [
          { style: '/assets/rendered/style.css' }
      ]
  },
  data: {
      foo: true,
      bar: 'yes',
      qux: {
          id: 123,
          baz: 'anything you wish, you can have any kind of object in the data object, it will be global and on every route'
      }
      
  }
  
};
*/


//middleware

var session = require("express-session"),
 bodyParser = require('body-parser');
app.use(bodyParser.json()); // parse application/json
// parse application/x-www-form-urlencoded
app.use(cors({origin: '*'}))
app.use(express.static("public"));  
app.use(session({ secret: "cats" }));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

//variables globales
app.use((req, res, next ) => {
  app.locals.success = req.flash('success');
  app.locals.message = req.flash('message');
  console.log("app"+req);
  //console.log(req);
  app.locals.user = req.user;
  next();
})


//rutas
/*
const expressVueMiddleware = expressVue.init(vueOptions);
    app.use(expressVueMiddleware);
*/

/*
expressVue.use(app).then(() => {
  //the rest of your express routes.
});
*/

app.use(require('./src/routes'))

/*
// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, './src/public')));
*/




//app.use(require('./src/modelos/usuario.js'))


//starting
app.listen(app.get('puerto'), function () {
    console.log('Example app listening on port'+ app.get('puerto'));
  });