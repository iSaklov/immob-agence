const express = require('express');
const app = express();
const path = require('path');
const config = require('./app/config');

//--------------------------------------------------------------------
//      Mise en place du moteur de template
//--------------------------------------------------------------------
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

//--------------------------------------------------------------------
//      Ajout du midlleware express session
//--------------------------------------------------------------------
const session = require('express-session');
app.use(session({
    secret: config.appKey, resave:false, saveUninitialized:false, 
    cookie: {maxAge: 3600000} 
}));

//--------------------------------------------------------------------
//      Ajout du midlleware express flash messages
//--------------------------------------------------------------------
const flash = require('express-flash-messages');
app.use(flash());

// //--------------------------------------------------------------------
// //      Ignore d'absence de connection
// //--------------------------------------------------------------------
// app.use((req, res, next) => {
//     req.session.user = {
//         firstname : 'Toto',
//     };
//     next();
// });

//--------------------------------------------------------------------
//      Connection à la session
//--------------------------------------------------------------------
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});
//--------------------------------------------------------------------
//      Traitement des données du formulaire 
//--------------------------------------------------------------------
app.use(express.urlencoded({ extended: true }));

//--------------------------------------------------------------------
//     Chargement de SASS
//--------------------------------------------------------------------
const sassMiddleware = require('node-sass-middleware');
app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'build/'),
    dest: path.join(__dirname, 'public/'),
    debug: false,   // true pour voir les traitements effectués
    indentedSyntax: false, // true Compiles files with the .sass extension
    outputStyle: 'compressed'
}));
//--------------------------------------------------------------------
//     Gestionnaire des sessions
//--------------------------------------------------------------------
app.use((req,res,next) => {
    res.locals.session = req.session;
    res.locals.route = req._parsedUrl.pathname;
    next();
});

//--------------------------------------------------------------------
//     Chargement de bodyParser
//--------------------------------------------------------------------
var bodyParser = require('body-parser');
const { appendFile } = require('fs');
app.use(bodyParser.urlencoded({ extended: false }));

//--------------------------------------------------------------------
//      Mise en place du répertoire static
//--------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
 
//--------------------------------------------------------------------
//      Chargement des routes
//--------------------------------------------------------------------
require('./app/routes')(app);
 
//--------------------------------------------------------------------
//     Ecoute du serveur HTTP
//--------------------------------------------------------------------
app.listen(config.port,() => {
    if (process.send) {
        process.send('online');
    }
    console.log(`Le serveur est démarré : http://localhost:${config.port}`);
});

