const fs = require('fs'),
    path = require('path'),
    Sequelize = require ('sequelize');
    db = {};
const config = require('../config/config');

// const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password,config.db.options);

const sequelize = new Sequelize('postgres://korpzektjerxkt:c3d9023e24b653c600c362b0d6b89585f4adfbfd52229f609804b86c86aebeca@ec2-46-137-156-205.eu-west-1.compute.amazonaws.com:5432/d5h83hhlsageb2',{dialect: 'postgres'});

fs.readdirSync(__dirname).filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
}).forEach(function (file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;