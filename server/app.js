const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');
const glob = require('glob');
var debug = require('debug')('server:server');
const https = require('https');
const http = require('http');
const fs = require('fs');
const config = require('./config/config');

const port = config.port || 3001;

const {notFound, errorHandler} = require('./middlewares');

const db = require('./models/index');
const app = express();


app.use(cors());
app.use(logger('dev'));


//prevent large entity limit
app.use(express.json({limit: '40mb'}));
app.use(express.urlencoded({ limit: '40mb', extended: true, parameterLimit: 40000}));


app.use('/api', router);
app.set('jwtSecretKey', 'secret key');
app.use(express.static(path.join(__dirname, '../client/dist')));

//Routes
var rootPath = path.normalize(__dirname + '/..');
var controllers = glob.sync(rootPath + '/server/routes/*.js');

controllers.forEach(function (controller) {
    require(controller)(app);
});

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
db.sequelize
    .sync()
    .then(function () {
        const options = {
            key: fs.readFileSync(path.join(__dirname, './cert/key.pem')),
            cert: fs.readFileSync(path.join(__dirname, './cert/cert.pem'))
        };
        if(config.env === 'dev'){
            http.createServer(app).listen(3000, function(){
                console.log('listening on http://localhost:'+ 3000)
            });
        }

        let server = https.createServer(options,app).listen(port, function(){
            console.log('listening on https://localhost:'+ port)
        });


        server.on('error', onError);
        server.on('listening', onListening);

        function onError(error) {
            if (error.syscall !== 'listen') {
                throw error;
            }

            var bind = typeof port === 'string'
                ? 'Pipe ' + port
                : 'Port ' + port;

            // handle specific listen errors with friendly messages
            switch (error.code) {
                case 'EACCES':
                    console.error(bind + ' requires elevated privileges');
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    console.error(bind + ' is already in use');
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        }

        /**
         * Event listener for HTTP server "listening" event.
         */

        function onListening() {
            var addr = server.address();
            var bind = typeof addr === 'string'
                ? 'pipe ' + addr
                : 'port ' + addr.port;
            debug('Listening on ' + bind);
        }



    }).catch(function (e) {
    throw new Error(e);
});



router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the SUM sParking API'
    });
});

app.use(notFound);
app.use(errorHandler);


module.exports = app;