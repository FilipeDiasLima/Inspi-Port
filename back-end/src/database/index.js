const Sequelize = require('sequelize');

const User = require('../app/models/User');
const Repository = require('../app/models/Repository');

const databaseConfig = require('../config/database');

const models = [User, Repository];

class Database {
  constructor() {
    this.init();
  }

  init(){
    // conexão com o banco de dados
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

module.exports = new Database();