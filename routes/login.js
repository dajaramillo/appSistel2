const router = require('express').Router();
const Usuario = require('../models/Usuario')

router.get('/login', (req, res) => {
    //res.send('Este es el LOGIN');
    res.render('login/login');
});

router.get('/register', (req, res) => {
    //res.send('Este es el REGISTER');
    res.render('login/register'); //Este es el archivop hbs
});

router.post('/register', async (req, res) => {
    const {nombre,correo,password,password2} = req.body;
    if(nombre.length <= 0){
        console.log('Introduce nombre');
    }
    else{
        console.log(nombre);
    }

    const newUser = new Usuario({nombre, correo, password});
    await newUser.save();

});


module.exports = router;