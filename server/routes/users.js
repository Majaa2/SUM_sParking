//Get all users

const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');

module.exports = function (app) {
    const ensureAuthenticated = require('../middlewares/ensureAuthenticated')(app);
    const isAllowed = require('../middlewares/isAllowed');

    app.use('/api', router);
    router.get('/users', ensureAuthenticated, (req, res) => {
        //auth user
       db.sequelize.query('select u.id, u.username, u.email, r.name as role_name, r.id as role_id from users u inner join roles r on u.role_id = r.id'
            ,{
            replacements: {
            }, type: sequelize.QueryTypes.SELECT}).then(function (users) {
            if (!users) {
                res.json({
                    success: false,
                    data: {
                        msg: 'No users found'
                    }
                });
            } else {
                res.json({
                    success: true,
                    msg: 'Sucessfully found users',
                    data: users
                });
            }
        });
    });
    router.get('/user', ensureAuthenticated, (req, res) => {
        db.user.findOne({
            where: {
                id: req.user[0].id,
            },
            raw: true,
        }).then(function (user) {
            if (!user) {
                res.json({
                    success: false,
                    data: {
                        msg: 'No user found'
                    }
                });
            } else {
                res.json({
                    success: true,
                    msg: 'Sucessfully found a user',
                    data: user
                });
            }
        });
    });

    //Get all roles

    router.get('/roles', ensureAuthenticated, (req, res) => {
        db.sequelize.query('select * from roles',{
            type: sequelize.QueryTypes.SELECT}).then(function (roles) {
            if (!roles) {
                res.json({
                    success: false,
                    data: {
                        msg: 'No roles found'
                    }
                });
            } else {
                res.json({
                    success: true,
                    msg: 'Successfully found roles',
                    data: roles
                });
            }
        });
    });
    router.post('/deleteUser/', ensureAuthenticated, isAllowed('canDeleteUser'), (req, res) => {
        db.sequelize.query('delete from users where id = :ID'
            ,{
            replacements: {
                ID: req.body.id
            }, type: sequelize.QueryTypes.DELETE}).then((result) => {
            if (result) {
                res.json({
                    success: true,
                    data: {
                        data: result,
                        msg: 'User has been deleted'
                    }
                });
            } else {
                res.json({
                    success: false,
                    data: {
                        msg: 'There has been an error while deleting a user'
                    }
                });
            }
        }).catch(function (err) {
            res.json({
                success: false,
                data: {
                    msg: 'There has been an error while deleting a user',
                    error: err
                }
            });
        });
    });

};
