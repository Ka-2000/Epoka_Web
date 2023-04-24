// création du routeur Express pour ce module
const express = require('express');
const routeur = express.Router();
const ctrlPaieMission = require('../controllers/paieMissionController.js');

routeur.get('/', ctrlPaieMission.controlPaieMission.afficherMission)
routeur.get('/modifPaie/:id', ctrlPaieMission.controlPaieMission.payerMission)

module.exports = routeur;