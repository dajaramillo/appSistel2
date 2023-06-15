const router = require('express').Router();
const Usuario = require('../models/Usuario')
const passport = require('passport');
const { isAuthenticated } = require('../helpers/auth');

router.get('/dashboard', isAuthenticated, (req, res) => {
    //res.send('Este es el LOGIN');
    res.render('dashboard/dashboard');
});

module.exports = router;