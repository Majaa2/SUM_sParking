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
    router.post('/changeLang', ensureAuthenticated, isAllowed('canChangeLang'), (req, res)=>{
        db.user.update({
            lang: req.body.lang
        }, {
            where: {id: req.body.id},
        }).then((result) => {
            if(result){
                res.json({
                    success: true,
                    data:{
                        data:result,
                        msg: "Language changed"
                    }
                });
            } else {
                res.json({
                    success: false,
                    data: {
                        msg: 'Could not change language!'
                    }
                });
            }
        })
    });

    //Edit user

    router.post('/editUser/', ensureAuthenticated, isAllowed('canEditUser'), (req, res) => {
        db.user.update({
            username: req.body.username,
            email: req.body.email,
            role_id: req.body.role_id
        }, {
            where: { id: req.body.id },
            returning: true,
            plain: true
        }).then((result) => {
            if (result) {
                res.json({
                    success: true,
                    data: {
                        data: result,
                        msg: 'toast.users.edit.succ'
                    }
                });
            } else {
                res.json({
                    success: false,
                    data: {
                        msg: 'toast.users.edit.err'
                    }
                });
            }
        })
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
                        msg: 'toast.users.delete.succ'
                    }
                });
            } else {
                res.json({
                    success: false,
                    data: {
                        msg: 'toast.users.delete.err'
                    }
                });
            }
        }).catch(function (err) {
            res.json({
                success: false,
                data: {
                    msg: 'toast.users.delete.dberr',
                    error: err
                }
            });
        });
    });

};
