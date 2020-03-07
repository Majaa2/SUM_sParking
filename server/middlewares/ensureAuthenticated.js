const jwt = require('jsonwebtoken');

module.exports = function (app) {
    return function ensureAuthenticated(req, res, next) {
       if(req.headers.authorization){
            var token = req.headers.authorization.replace('Bearer ', '');
            jwt.verify(token, app.get('jwtSecretKey'), function (err, decoded) {
                if(!err && decoded) {
                    req.user = decoded.user;
                    next();
                } else {
                    return res.status(403).json({ msg: 'Token not valid!' });
                }
            });
        }
       else{
           return res.status(403).json({ msg: 'No credentials sent!' });
       }
    }
};