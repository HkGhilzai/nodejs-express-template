'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        user_name: {
            type: DataTypes.VIRTUAL,
            get() {
                const firstName = this.getDataValue('first_name');
                const lastName = this.getDataValue('last_name');
                
                return (firstName && firstName.trim() && lastName && lastName.trim()) ? `${firstName} ${lastName}` : this.getDataValue('email');
            }
        },
        email: {
            type: DataTypes.STRING(254),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(72),
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM(['REGULAR', 'USER_MANAGER', 'ADMIN']),
        },
        preferences: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: {}
        },
    }, {
        freezeTableName: true,
        tableName: 'users',
        underscored: true,
        timestamps: true,
    });
   
    User.associate = function (models) {
        User.hasMany(models.Token, {
            foreignKey: 'user_id'
        })
    };
   
    return User;
};
