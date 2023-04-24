// création du routeur Express pour ce module
const express = require('express');
const routeur = express.Router();
const ctrlParametrage = require('../controllers/parametrageController.js');

routeur.get('/', ctrlParametrage.controlParametrage.infosParametrage)
routeur.post('/modifRembKM', ctrlParametrage.controlParametrage.modifierRemboursementKM)
routeur.post('/modifRembJournee', ctrlParametrage.controlParametrage.modifierRemboursementJournalier)
routeur.post('/ajoutDistance', ctrlParametrage.controlParametrage.ajouterDistance)

module.exports = routeur;