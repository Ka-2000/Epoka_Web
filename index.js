// inclure les dépendances et middlewares
const express = require('express');
const ejs = require('ejs');
const path = require('path');


// Importer les routes
const connexionRoutes = require('./routes/routesConnexion.js');
const validMissionRoutes = require('./routes/routesValidMission.js');
const paieMissionRoutes = require('./routes/routesPaieMission.js');
const parametrageRoutes = require('./routes/routesParametrage.js');

// activer les dépendances pour Express et EJS
let app = express()
app.set('view engine', 'ejs')
app.use(express.static('views'))
app.use(express.static('public'))

// activer le middleware et lancer l'application sur le port 3000
app.use(express.json());
app.use(express.urlencoded());
app.listen(3000, () => console.log('le serveur Epoka est prêt.'))

// utiliser les routeurs
app.get('/', (req, res) => {
    res.send('Epoka est actif');
});

// Afficher la page d'inscription
app.get('/connexion', function(req, res) {
    res.render('connexion');
});


// utiliser les routes
app.use('/connexion', connexionRoutes);
app.use('/validMission', validMissionRoutes);
app.use('/paieMission', paieMissionRoutes);
app.use('/parametrage', parametrageRoutes);