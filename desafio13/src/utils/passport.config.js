const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../models/user.model');
const { isValidPassword } = require('./bcrypt.config');

passport.use('login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await userModel.findOne({ email });
      if (!user){
        console.log(`Usuario no encontrado con el correo: ${email}`)
        return done(null, false);
      } 
      if (!isValidPassword(user, password)){
        console.log('Contraseña incorrecta')
        return done(null, false)
      }
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});