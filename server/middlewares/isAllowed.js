let rolePermissions = {
    admin: ['canRegisterUsers', 'canDeleteUser'],
}

module.exports = function (actionName) {
    return function isAllowed(req, res, next) {
        let userPermissions =  rolePermissions[req.user[0].role_name].map(function(permission){
            return permission;
        })
        if (userPermissions.indexOf(actionName) > -1){
            next();
        }else {
            return res.status(403).json({
                    success: false,
                    msg: 'Permission denied for this user!',
            });
        }
    }
};