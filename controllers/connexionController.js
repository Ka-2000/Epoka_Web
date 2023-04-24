const modelConnSal = require('../models/modelConnexion');
const cookieparser = require('cookie-parser')

const controlConnSal = {

    async Connexion(req, res) {

        try {

            const data = await modelConnSal.ConnexionSalarie.Connexion(req)

            if (data[0]['COUNT(*)'] == 1) {

                res.cookie('connecté', 1)

                res.redirect('/validMission')

            }else {
                res.redirect("/connexion")
            } 
        } catch (error) {
            console.log(error)
        }
    },

    async Deconnexion(req, res) {

        try {

            res.clearCookie('connecté')
            
            res.redirect('/connexion')

        } catch (error) {
            console.log(error)
        }
    }
}


module.exports = {
    controlConnSal
}