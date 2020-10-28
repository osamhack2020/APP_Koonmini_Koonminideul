module.exports =(sequelize, DataTypes) => {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        deviceId: {
            type: DataTypes.STRING(16),
            allowNull: false,
            unique: true,
        },
        locking: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        goOut: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        }
    }, {
        timestamps: true,
    });
};