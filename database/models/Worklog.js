'use strict';
module.exports = (sequelize, DataTypes) => {
    const Worklog = sequelize.define('Worklog', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        hours_worked: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }, {
        freezeTableName: true,
        tableName: 'worklogs',
        underscored: true,
        timestamps: true,
    });
   
    Worklog.associate = function (models) {
        Worklog.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        })
    };
   
    return Worklog;
};
