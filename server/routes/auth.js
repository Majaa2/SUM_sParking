const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');

module.exports = function (app) {
    const ensureAuthenticated = require('../middlewares/ensureAuthenticated')(app);
    const isAllowed = require('../middlewares/isAllowed');
    
    app.use('/api', router);
    router.post('/login', (req, res) => {
        console.log(req, 'i sta ia')
        //auth user
        db.sequelize.query('select u.*, r.name as role_name from users u inner join roles r on r.id = u.role_id where u.username = :username'
            ,{
            replacements: {
                username: req.body.username
            }, type: sequelize.QueryTypes.SELECT}).then(function (user) {
            if (!user[0]) {
                res.json({
                    success: false,
                    data: {
                        msg: 'Could not login'
                    }
                });
            } else {
                bcrypt.compare(req.body.password, user[0].password, function (err, result) {
                    if (result === true) {
                        delete user[0].password;
                        const token = jwt.sign({user}, app.get('jwtSecretKey'));
                        res.json({
                            success: true,
                            data: {
                                user: user[0],
                                msg: 'Successfully logged in'
                            },
                            token
                        });
                    } else {
                        res.json({
                            success: false,
                            data: {
                                msg: 'There has been an error, please try again'
                            }
                        });
                    }
                });
            }
        });
    });

    router.post('/register', ensureAuthenticated, isAllowed('canRegisterUsers'), (req, res) => {
        db.user.findOrCreate({where:{
                username: req.body.username
            }, defaults: {
                password: req.body.password,
                email: req.body.email,
                role_id: req.body.role_id
            }
        }).then((result) => {
            if (result) {
                let created = result[1];
                if (!created) {
                    res.json({
                        success: false,
                        data: {
                            msg: 'This user already exists'
                        }
                    });
                }
                else{
                    res.json({
                        success: true,
                        data: {
                            user: result[0],
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
    });

    //Change password

    router.post('/changePassword', (req, res) => {
        db.user.update({
            password: req.body.newPassword,
        }, {
            where: { id: req.body.id },
            returning: true,
            plain: true
        }).then(function (result) {
            if (result) {
                res.json({
                    success: true,
                    data: {
                        user: result,
                        msg: 'Password changed succesfully'
                    }
                });
            } else {
                res.json({
                    success: false,
                    data: {
                        msg: 'An error occured while changing the password'
                    }
                });
            }
        });
    });
};