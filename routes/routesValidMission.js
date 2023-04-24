// création du routeur Express pour ce module
const express = require('express');
const routeur = express.Router();
const ctrlValidMission = require('../controllers/validMissionController.js');

routeur.get('/', ctrlValidMission.controlValidMission.afficherMission)
routeur.get('/modifValid/:id', ctrlValidMission.controlValidMission.validerMission)

module.exports = routeur;