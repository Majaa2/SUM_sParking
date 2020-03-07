const bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            set: function (v) {
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(v, salt);
                this.setDataValue('password', hash);
            },
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
                notEmpty: true
            }
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'roles',
                key: 'id'
            },
        }
    }, {
        indexes: [
            {
                unique: true,
                fields: ['email', 'username']
            }
        ],
        timestamp: true,
        underscored: true
    });
};