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

const parametrage = {

    async montantRemboursement(req) {

        let requete = "SELECT * FROM parametres"

        return new Promise((reussi, echec) => {

            mysqlconnexion.query(requete, (err, lignes, champs) => {

                if (err) {

                    return echec(err)

                }

                return reussi(lignes)

            })
        })
    },

    async modifierRemboursementKM(req) {

        let newMtKM = req.body.newMtKM

        let requete = "UPDATE parametres SET parametre_ForfaitKm = ?"

        return new Promise((reussi, echec) => {

            mysqlconnexion.query(requete, [newMtKM], (err, lignes, champs) => {

                if (err) {

                    return echec(err)

                }

                return reussi(lignes)

            })
        })
    },

    async modifierRemboursementJournalier(req) {

        let newMtJournee = req.body.newMtJournee

        let requete = "UPDATE parametres SET parametre_MontantJournalier = ?"

        return new Promise((reussi, echec) => {

            mysqlconnexion.query(requete, [newMtJournee], (err, lignes, champs) => {

                if (err) {

                    return echec(err)

                }

                return reussi(lignes)

            })
        })
    },


    async ajouterDistance(req) {

        let villeDepart = req.body.villeDepart
        let villeArrivee = req.body.villeArrivee
        let distanceAuKm = req.body.distanceAuKm

        let requete = "INSERT INTO distance(distance_IdVilleDepart, distance_IdVilleArrive, distance_NombreKm) VALUES (?, ?, ?)"

        return new Promise((reussi, echec) => {

            mysqlconnexion.query(requete, [villeDepart, villeArrivee, distanceAuKm], (err, lignes, champs) => {

                if (err) {

                    return echec(err)

                }

                return reussi(lignes)

            })
        })
    },


    async afficherCommune(req) {

        let requete = "SELECT * FROM commune"

        return new Promise((reussi, echec) => {

            mysqlconnexion.query(requete, (err, lignes, champs) => {

                if (err) {

                    return echec(err)

                }

                return reussi(lignes)

            })
        })
    },


    async afficherDistance(req) {

        let requete = "SELECT * FROM distance"

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
    parametrage
}