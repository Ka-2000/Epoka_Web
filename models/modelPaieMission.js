// inclure les dépendances et middlewares
const mysql = require('mysql2');
let iniparser = require('iniparser');
const bodyparser = require('body-parser')
const { urlencoded } = require('body-parser')

// activer les dépendances pour la bdd
let configDB = iniparser.parseSync('./DB.ini')
let mysqlconnexion = mysql.createConnection({
    host:configDB['dev']['host'],
    user:configDB['dev']['user'],
    password:configDB['dev']['password'],
    database:configDB['dev']['database']
})

mysqlconnexion.connect((err) => {
    if (!err) console.log('BDD connectée. =====================================================================================')
    else console.log('BDD connexion échouée \n Erreur: '+JSON.stringify(err))
})

const paieMission = {

    async payerMission(req) {

        let misId = req.params.id

        let requete = "UPDATE mission SET mission_Payee = 1 WHERE mission_Id = ?"

        return new Promise((reussi, echec) => {

            mysqlconnexion.query(requete, [misId], (err, lignes, champs) => {

                if (err) {

                    return echec(err)

                }

                return reussi(lignes)

            })
        })
    },

    async afficherMission(req) {

        let requete = "SELECT mission.mission_Id, mission.mission_IdCommune, distance.distance_NombreKm, ABS(DATEDIFF(mission.mission_DateDebut, mission.mission_DateFin)) as nbJours, "
        + "mission.mission_DateDebut, mission.mission_DateFin, employe.employe_Nom, employe.employe_Prenom, CD.comNom as CD, CA.comNom as CA, "
        + "mission.mission_Validation, mission.mission_Payee, parametres.parametre_ForfaitKm, parametres.parametre_MontantJournalier, CA.comCP "
        + "FROM parametres, mission "
        + "JOIN employe ON mission.mission_IdEmploye = employe.employe_Id "
        + "JOIN agence ON employe.employe_IdAgence = agence.agence_Id "
        + "JOIN commune CD ON agence.agence_IdCommune = CD.comId "
        + "JOIN commune CA ON mission.mission_IdCommune = CA.comId "
        + "LEFT JOIN distance ON distance.distance_IdVilleDepart = LEAST(CD.comId, CA.comId) "
        + "AND distance.distance_IdVilleArrive = GREATEST(CD.comId, CA.comId) "
        + "WHERE mission_Validation = 1 ORDER BY mission_Id"

        /* let requete = "SELECT mission.mission_Id, distance.distance_NombreKm, mission.mission_DateDebut, mission.mission_DateFin, employe.employe_Nom, employe.employe_Prenom, CD.ComNom as CD, CA.ComNom as CA, mission.mission_Validation, mission.mission_Payee, parametres.parametre_ForfaitKm, parametres.parametre_MontantJournalier"
        +"FROM parametres, mission"
        +"JOIN employe ON mission.employe_Id = employe.employe_Id"
        +"JOIN agence ON employe.employe_IdAgence = agence.agence_Id"
        +"JOIN commune CD ON agence.agence_IdCommune = CD.ComId"
        +"JOIN commune CA ON mission.mission_IdCommune = CA.ComId"
        +"LEFT JOIN distance"
        +"ON distance.distance_IdVilleDepart = LEAST(CD.ComId, CA.ComId)"
        +"AND distance.distance_IdVilleArrive  = GREATEST(CD.ComId, CA.ComId)" */

        return new Promise((reussi, echec) => {

            mysqlconnexion.query(requete, (err, lignes, champs) => {

                if (err) {

                    return echec(err)

                }

                return reussi(lignes)

            })
        })
    }

}

module.exports = {
    paieMission
}