const modelPaieMission = require('../models/modelPaieMission');
const cookieparser = require('cookie-parser')

const controlPaieMission = {

    async afficherMission(req, res) {

        try {

            const data = await modelPaieMission.paieMission.afficherMission(req)

            if (data) {

                res.render('paieMission', {dataMission : data})

            }else {
                res.render('paieMission', {dataMission : {}})
            }

        } catch (error) {
            console.log(error)
        }
    },

    async payerMission(req, res) {

        try {

            const data = await modelPaieMission.paieMission.payerMission(req)

            if (data) {

                res.redirect('/paieMission')

            }else {
                console.log("probleme")
                res.redirect("paieMission/modifPaie/" + req.params.id)
            } 

        } catch (error) {
            console.log(error)
        }
    }
    
}


module.exports = {
    controlPaieMission
}