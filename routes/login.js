const router = require('express').Router();
const Usuario = require('../models/Usuario')
const passport = require('passport');

//Métodos GET y POST para el inicio de sesión
router.get('/login', (req, res) => {
    //res.send('Este es el LOGIN');
    res.render('login/login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}));



//Métodos GET y POST para el registro
router.get('/register', (req, res) => {
    //res.send('Este es el REGISTER');
    res.render('login/register'); //Este es el archivop hbs
});

router.post('/register', async (req, res) => {
    const { nombre, correo, password, password2 } = req.body;
    const errors = [];
    if(nombre.length <= 0){
        errors.push({text: 'Ingrese el nombre'})
    }
    if(password != password2) {
        errors.push({text: 'Contraseñas no coinciden'});
    }
    if(password.length < 4){
        errors.push({text: 'Contraseña mínimo de 4 caracteres'})
    }
    if(errors.length > 0){
        res.render('login/register', {errors, nombre, correo, password, password2});
    } else {
        //res.send('OK');
        const emailUser = await Usuario.findOne({correo: correo});
        if(emailUser){
            req.flash('error_msg', 'El correo ya está registrado');
            res.redirect('/register');
            
            
        } else {
        const newUser = new Usuario({nombre, correo, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Usuario Registrado');
        res.redirect('/login');
        }
    }

});

router.get('/logout', (req, res) => {
    req.logout((err)=>{
        if(err) { return next(err);}
        res.redirect('/');
    });
    
});

module.exports = router;