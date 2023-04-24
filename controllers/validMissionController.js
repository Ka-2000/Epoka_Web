const modelValidMission = require('../models/modelValidMission');
const cookieparser = require('cookie-parser')

const controlValidMission = {

    async afficherMission(req, res) {

        try {

            const data = await modelValidMission.validMission.afficherMission()

            if (data) {
                res.render('validMission', {dataMission : data})

            }else {
                res.render('validMission', {dataMission : {} })
            } 

        } catch (error) {
            console.log(error)
        }
    },

    async validerMission(req, res) {

        try {

            const data = await modelValidMission.validMission.validerMission(req)

            if (data) {

                res.redirect('/validMission')

            }else {
                console.log("probleme")
                res.redirect("validMission/modifValid/" + req.params.id)
            } 

        } catch (error) {
            console.log(error)
        }
    }
    
}


module.exports = {
    controlValidMission
}