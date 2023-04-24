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

const ConnexionSalarie = {

    async Connexion(req) {

        let salMatricule = req.body.salMatricule
        let salMdp = req.body.salMdp

        let requete = "SELECT COUNT(*) FROM employe WHERE employe_Id = ? AND employe_Mdp = password(?)"

        return new Promise((reussi, echec) => {

            mysqlconnexion.query(requete, [salMatricule, salMdp] , (err, lignes, champs) => {

                if (err) {

                    return echec(err)

                }

                return reussi(lignes)

            })
        })
    }
}

module.exports = {
    ConnexionSalarie
}