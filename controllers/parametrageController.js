const modelParametrage = require('../models/modelParametrage');
const cookieparser = require('cookie-parser')

const controlParametrage = {

    async infosParametrage(req, res) {

        try {

            const data = await modelParametrage.parametrage.montantRemboursement(req)
            const dataCommune = await modelParametrage.parametrage.afficherCommune(req)
            const dataDistance = await modelParametrage.parametrage.afficherDistance(req)

            if (data && dataCommune, dataDistance) {

                res.render('parametrage', {dataRemboursement : data, dataCommune : dataCommune, dataDistance : dataDistance})

            }else {
                res.render('parametrage', {dataRemboursement : {}, dataCommune : {}, dataDistance : {}})
            }

        } catch (error) {
            console.log(error)
        }
    },

    async modifierRemboursementKM(req, res) {

        try {

            const data = await modelParametrage.parametrage.modifierRemboursementKM(req)

            if (data) {

                res.redirect('/parametrage')

            }else {
                console.log("probleme")
                res.redirect("parametrage/modifRembKM/")
            } 

        } catch (error) {
            console.log(error)
        }
    },

    async modifierRemboursementJournalier(req, res) {

        try {

            const data = await modelParametrage.parametrage.modifierRemboursementJournalier(req)

            if (data) {

                res.redirect('/parametrage')

            }else {
                console.log("probleme")
                res.redirect("parametrage/modifRembJournee/")
            } 

        } catch (error) {
            console.log(error)
        }
    },

    async ajouterDistance(req, res) {

        try {

            const data = await modelParametrage.parametrage.ajouterDistance(req)

            if (data) {

                res.redirect('/parametrage')

            }else {
                console.log("probleme")
                res.redirect("parametrage/ajoutDistance/")
            } 

        } catch (error) {
            console.log(error)
        }
    }

    
}


module.exports = {
    controlParametrage
}