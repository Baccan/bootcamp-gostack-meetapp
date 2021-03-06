import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            // return `http://localhost:3333/files/${this.path}`;
            return `${process.env.APP_URL}/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    // Retorna o model que acaba de ser inicializado
    return this;
  }
}

export default File;
