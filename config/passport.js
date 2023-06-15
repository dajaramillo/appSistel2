const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/Usuario');

passport.use(new LocalStrategy({
    usernameField: 'correo'
}, async (correo, password, done) => {
    
    const user = await User.findOne({correo: correo});
    if(!user) {
        return done(null, false, {message: 'Usuario no encontrado'});
    } else{
        const match = await user.matchPassword(password);
        if(match) {
            return done(null, user);
        } else {
            return done(null, false, {message: 'Contraseña incorrecta'});
        }
    }
}
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id).then(function (user) {
        console.log(user);
        done(null, user);
    }).catch(function (err) {
        done(err, null, { message: 'User does not exist' });
    });
});