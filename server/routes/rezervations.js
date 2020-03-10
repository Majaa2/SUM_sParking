const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');

module.exports = function (app) {
    const ensureAuthenticated = require('../middlewares/ensureAuthenticated')(app);
    const isAllowed = require('../middlewares/isAllowed');

    app.use('/api', router);
    router.get('/rezervations', (req,res)=>{
        db.sequelize.query('select * from rezervations', {
            type: sequelize.QueryTypes.SELECT}).then(function(rezervations){
                if(!rezervations){
                    res.json({
                        success: false,
                        data: {
                            msg: 'No rezervations found'
                        }
                    });
                }else {
                    res.json({
                        success: true,
                        msg: 'Successfully found rezervations',
                        data: rezervations
                    });
                }
            })
    });

    router.post('/rezervations', (req, res)=>{
        db.sequelize.query('insert into rezervations(parking_space_id, user_id, rezervation_time, created_at, updated_at) VALUES(:parkingId, :userId, :rezervationTime, NOW(), NOW())',{
            replacements:{
                parkingId: req.body.parkingId,
                userId: req.body.userId,
                rezervationTime: req.body.rezervationTime
            },
            type: sequelize.QueryTypes.INSERT
        }).then((result)=>{
            if (result) {
                let created = result[1];
                if (!created) {
                    res.json({
                        success: false,
                        data: {
                            msg: 'Error'
                        }
                    });
                }
                else{
                    res.json({
                        success: true,
                        data: {
                            rezervation: result[0],
                            msg: 'The user has been created succesfully'
                        }
                    });}

            } else {
                res.json({
                    success: false,
                    data: {
                        msg: 'There has been an error creating the user'
                    }
                });
            }
        })
    }),
    router.post('/deleteRezervation/', (req, res) => {
        db.sequelize.query('delete from rezervations where id = :ID'
            ,{
            replacements: {
                ID: req.body.id
            }, type: sequelize.QueryTypes.DELETE}).then((result) => {
            if (result) {
                res.json({
                    success: true,
                    data: {
                        data: result,
                        msg: 'Reservation has been deleted'
                    }
                });
            } else {
                res.json({
                    success: false,
                    data: {
                        msg: 'There has been an error while deleting a reservation'
                    }
                });
            }
        }).catch(function (err) {
            res.json({
                success: false,
                data: {
                    msg: 'There has been an error while deleting a reservation',
                    error: err
                }
            });
        });
    });
}