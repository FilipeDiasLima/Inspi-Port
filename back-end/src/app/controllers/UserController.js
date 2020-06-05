const Yup = require('yup');

const User = require('../models/User');

class UserController {
  async store(req, res){
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(4),
    });

    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails'})
    }

    // verificação de email, caso exista um ja cadastrado
    const userExist = await User.findOne({
      where: {email: req.body.email}
    });

    if (userExist) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const {id, name, email} = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

module.exports = new UserController();