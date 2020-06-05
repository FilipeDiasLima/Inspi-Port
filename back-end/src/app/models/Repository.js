const {Model} = require('sequelize');
const Sequelize = require('sequelize');

class Repository extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        url: Sequelize.STRING,
        techs: Sequelize.STRING,
        user_id: 0,
        likes: 0,
      },
      {
        sequelize,
        paranoid: true,
      },
    );
    return this;
  }
  
  // Associação com o usuário para saber e relacionar no
  // banco de dados o repositório com o usuário
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
  
}

module.exports = Repository;