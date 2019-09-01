import Sequelize from 'sequelize';
// import mongoose from 'mongoose';

import User from '../app/models/User';
import File from '../app/models/File';
import Meetup from '../app/models/Meetup';
import Subscription from '../app/models/Subscription';

import databaseConfig from '../config/database';

const models = [User, File, Meetup, Subscription];

class Database {
  constructor() {
    this.init();
    // this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    // Chama todos os métodos init() dos Models para passar a conexão
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  // mongo() {
  //   const { MONGO_HOST, MONGO_PORT, MONGO_NAME } = process.env;

  //   const mongoURI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}`;

  //   this.mongoConnection = mongoose.connect(mongoURI, {
  //     useNewUrlParser: true,
  //     useFindAndModify: true,
  //   });
  // }
}

export default new Database();
