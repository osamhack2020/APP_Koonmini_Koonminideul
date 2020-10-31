const Sequelize = require('sequelize');
const Admin = require('./admin');
const User = require('./user');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.Admin = Admin;
db.User = User;

Admin.init(sequelize);
User.init(sequelize);

Admin.associate(db);
User.associate(db);

module.exports = db;