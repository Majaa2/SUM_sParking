module.exports = function (sequelize, DataTypes) {
    return sequelize.define('parking', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        occupied: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        lat: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        lng: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        parkingType: {
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        parkingSpaceTag: {
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        is_visible:{
            type: DataTypes.BOOLEAN,
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