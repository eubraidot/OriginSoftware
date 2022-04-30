const cookieParser = require('cookie-parser');
const express = require('express');
const passport= require('passport');
const PassportLocal= require('passport-local').Strategy;
const session= require('express-session');

const app = express();
const port = 8080;

// Middleware
app.use(express.urlencoded(({extended: true}))); //Sin esto cuando recibo el body del Post no puedo hacer nada.
app.use(cookieParser('Secreto1')); //No deberia ser revelado el secreto
app.use(session({
 secret:'Secreto2',
 // Defne comportamiento de las sessiones
 resave: true, // implica que en cada peticion, aunque no haya sido modificada, la vamos a volver a guardar.
 saveUninitialized: true // si iniciamos una session en una peticion y no le guardamos nada, aún así va a guardar.
}));
app.use(passport.initialize());
app.use(passport.session()); // hay que definir las estrategias de inicio de session
                             //1 - Inicio con redes sociales (facebook, google, etc)
                             //2 - Autenticacion para servicios web(goOut,json web tokens)
                             //3 - Passport Local, es tradicional loguea usuario y contraseña.
passport.use(new PassportLocal(function(username, password, done){

    if(username==='eubraidot'&& password==='root'){
       return done(null, {id:1, name:'pepe'})
   }else {
       return done(null,false);
   }
}));
// Serializar.
passport.serializeUser(function(user,done){
    done(null, user.id);
});
// Deserializar
passport.deserializeUser(function(id, done){
    done(null, {id:1, name:'pepe'}) // tradicionalmente buscaríamos el usuario en la base de datos.
})

app.set('view engine','ejs');

app.get('/', (req, res) => {
//   Si ya iniciamos mostrar bienvenida

// Si no hemos iniciado sesión redireccionar a /login
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', passport.authenticate('local',{
    successRedirect: "/",
    failureRedirect: "/login"
}))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})