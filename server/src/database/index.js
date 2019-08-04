import Sequelize from 'sequelize';

import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    // Chama todos os métodos init() dos Models para passar a conexão
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
