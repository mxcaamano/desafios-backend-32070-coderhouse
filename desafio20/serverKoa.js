const Koa = require('koa');
const { koaBody } = require('koa-body');
require('dotenv').config();
const serve = require('koa-static');
const views = require('koa-views');
const render = views(__dirname + '/views', { extension: 'ejs' });

// Sesiones, cookies y Passport
const passport = require('./src/utils/passportKoa.config');
const session = require('koa-session')

/*                   App                   */
const app = new Koa();
app.use(koaBody());
app.use(serve(__dirname + '/public'));
app.use(render);
app.keys = ['secret']
app.use(session({}, app))
app.use(passport.initialize());
app.use(passport.session());

//Rutas
const products = require('./src/routes/koa/products.routes');
const carts = require('./src/routes/koa/carts.routes');
const signUp = require('./src/routes/koa/signUp.routes');
const logout = require('./src/routes/koa/logout.routes');
const login = require('./src/routes/koa/login.routes');
const profile = require('./src/routes/koa/profile.routes');
require('method-override');
const methodOverride = require('koa-methodoverride');

app.use(products.routes());
app.use(carts.routes());
app.use(signUp.routes());
app.use(logout.routes());
app.use(login.routes());
app.use(profile.routes());
app.use(methodOverride());

//Inicialización de Servidor
const PORT = 4000
const server = app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${server.address().port}`)
});

server.on('error', err => console.log(`Error en el servidor ${err}`))

