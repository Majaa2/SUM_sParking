module.exports = function (sequelize, DataTypes) {
    return sequelize.define('rezervations', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        parkingSpaceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'parkings',
                key: 'id'
            },
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
        },
        rezervationTime: {
            type: DataTypes.DATE,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        }

    }, {
        timestamp: true,
        underscored: true
    });
};