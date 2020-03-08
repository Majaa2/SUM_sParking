
const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');

module.exports  = function(app){
    const ensureAuthenticated = require('../middlewares/ensureAuthenticated')(app);
    const isAllowed = require('../middlewares/isAllowed');

    app.use('/api', router);
    router.get('/parking', ensureAuthenticated, (req, res) => {
        db.sequelize.query('select * from parkings').then(function (parking){
            if(!parking){
                res.json({
                    success: false,
                    data: {
                        msg: 'No parking spaces found'
                    }
                });
            } else {
                res.json({
                    success: true,
                    msg: 'Sucessfully found all parking spaces',
                    data: parking
                });
            }
        })
    });

    router.post('/parking', (req, res)=>{
        db.parking.findOrCreate({
            where:{
                id: req.body.id
            }, defaults: {
                occupied: req.body.occupied,
                lat: req.body.lat,
                lng: req.body.lng,
                parkingType: req.body.type,
                parkingSpaceTag: req.body.tag,
                is_visible: req.body.visible
            }
        }).then((result)=>{
            if (result) {
                let created = result[1];
                if (!created) {
                    res.json({
                        success: false,
                        data: {
                            msg: 'This parking space already exists'
                        }
                    });
                }
                else{
                    res.json({
                        success: true,
                        data: {
                            user: result[0],
                            msg: 'The parking space has been created succesfully'
                        }
                    });}

            } else {
                res.json({
                    success: false,
                    data: {
                        msg: 'There has been an error while adding a new parking space'
                    }
                });
            }
        })
    })
}