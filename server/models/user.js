const Sequelize = require('sequelize');

module.exports =class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            service_number: {
                type: Sequelize.STRING(11),
                allowNull: false,
            },
            company: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            phone_number: {
                type: Sequelize.STRING(13),
                allowNull: true,
            },
            contact_number: {
                type: Sequelize.STRING(13),
                allowNull: true,
            },
            registration_number: {
                type: Sequelize.STRING(8),
                allowNull: false,
            },
            device_id: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            locked: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
            },
            state: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            date: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.User.belongsTo(db.Admin, { foreignKey: 'admin', targetKey: 'id' })
    }
};

/*
mysql> desc users;
+---------------------+-------------+------+-----+-------------------+-------------------+
| Field               | Type        | Null | Key | Default           | Extra             |
+---------------------+-------------+------+-----+-------------------+-------------------+
| id                  | int         | NO   | PRI | NULL              | auto_increment    |
| admin               | int         | NO   | MUL | NULL              |                   |
| name                | varchar(20) | NO   | UNI | NULL              |                   |
| service_number      | varchar(11) | NO   |     | NULL              |                   |
| company             | varchar(10) | NO   |     | NULL              |                   |
| phone_number        | varchar(13) | YES  |     | NULL              |                   |
| contact_number      | varchar(13) | YES  |     | NULL              |                   |
| registration_number | varchar(8)  | NO   |     | NULL              |                   |
| device_id           | varchar(20) | YES  |     | NULL              |                   |
| locked              | tinyint     | YES  |     | NULL              |                   |
| state               | varchar(10) | YES  |     | NULL              |                   |
| date                | datetime    | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| comment             | text        | YES  |     | NULL              |                   |
+---------------------+-------------+------+-----+-------------------+-------------------+
13 rows in set (0.01 sec)
*/
