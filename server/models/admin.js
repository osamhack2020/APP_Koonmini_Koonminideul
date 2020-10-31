const Sequelize = require('sequelize');

module.exports =class Admin extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            date: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            email: {
                type: Sequelize.STRING(40),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false,
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Admin',
            tableName: 'admins',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Admin.hasMany(db.User, { foreignKey: 'admin', sourceKey: 'id' })
    }
};

/*
mysql> desc admins;
+----------+--------------+------+-----+-------------------+-------------------+
| Field    | Type         | Null | Key | Default           | Extra             |
+----------+--------------+------+-----+-------------------+-------------------+
| id       | int          | NO   | PRI | NULL              | auto_increment    |
| name     | varchar(20)  | NO   | UNI | NULL              |                   |
| date     | datetime     | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| email    | varchar(40)  | NO   | UNI | NULL              |                   |
| password | varchar(100) | NO   |     | NULL              |                   |
+----------+--------------+------+-----+-------------------+-------------------+
5 rows in set (0.00 sec)
*/
