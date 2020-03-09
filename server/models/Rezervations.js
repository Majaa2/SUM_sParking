module.exports = function (sequelize, DataTypes) {
    return sequelize.define('rezervations', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        parking_space_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
        },
        rezervation_time: {
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