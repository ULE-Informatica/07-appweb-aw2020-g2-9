const express = require('express');
const router = express.Router();


/*
router.get('/', (req, res) => {
    res.send('Hello World!')
})
    .use('/usuario',  require('./usuario')  );

;
*/
router.use('/usuario', require('./usuario'));
router.use('/registro', require('./registro'));
router.use('/login', require('./login'));
router.use('/lista', require('./lista'));
router.use('/etiqueta', require('./etiqueta'));
router.use('/pelicula', require('./pelicula'));







console.log('sali');



module.exports = router;




