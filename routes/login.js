const router = require('express').Router();

router.get('/login', (req, res) => {
    //res.send('Este es el LOGIN');
    res.render('login/login');
});

router.get('/register', (req, res) => {
    //res.send('Este es el REGISTER');
    res.render('login/register'); //Este es el archivop hbs
});

module.exports = router;