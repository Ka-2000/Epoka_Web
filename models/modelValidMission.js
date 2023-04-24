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

const validMission = {

    async afficherMission(req) {

        return new Promise((reussi, echec) => {

            mysqlconnexion.query("SELECT * FROM mission, employe, commune WHERE mission_IdCommune=comId AND mission_IdEmploye=employe_Id", (err, lignes, champs) => {

                if (err) {

                    return echec(err)

                }

                return reussi(lignes)

            })
        })
    },

    async validerMission(req) {

        let misId = req.params.id

        let requete = "UPDATE mission SET mission_Validation = 1 WHERE mission_Id = ?"

        return new Promise((reussi, echec) => {

            mysqlconnexion.query(requete, [misId], (err, lignes, champs) => {

                if (err) {

                    return echec(err)

                }

                return reussi(lignes)

            })
        })
    }

}

module.exports = {
    validMission
}