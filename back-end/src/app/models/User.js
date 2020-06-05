const {Model} = require('sequelize');
const Sequelize = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  checkPassword(password){
    if (password === this.password) {
      return true;
    }
  }
}

module.exports = User;