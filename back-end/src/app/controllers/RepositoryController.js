const Yup = require('yup');

const Repository = require('../models/Repository');
const User = require('../models/User');

class RepositoryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      url: Yup.string().url().required(),
      techs: Yup.string().required(),
    });

    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails'})
    }

    // verificação de url, caso exista ou já tenha sido postada
    const user_id = req.headers.authorization;

    const urlExist = await Repository.findOne({
      where: { url: req.body.url}
    });

    if (urlExist) {
      return res.status(400).json({ error: 'Repository already exists.' }); 
    }

    const { id, title, url, techs } = req.body;

    
    const newRepository = {
      id,
      user_id,
      title,
      url,
      techs,
      likes: 0,
    }

    await Repository.create(newRepository);

    return res.json(newRepository);
  }

  async index(req, res) {
    // a listagem por página
    const { page = 1} = req.query;

    const repositories = await Repository.findAll({
      where: { user_id: req.headers.authorization, deleted_at: null },
      order: ['id'],
      attributes: ['id', 'title', 'url', 'techs', 'likes'],
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json(repositories);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      url: Yup.string().url(),
      techs: Yup.string(),
    });

    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails'})
    }

    const { title, url, techs } = req.body;

    const { id } = req.params;
    const userId = req.headers.authorization 

    const repositories = await Repository.findByPk(id);

    if (repositories.user_id != userId) {
      return res.status(401).json({
        error: "You don't have permisstion to update this repository."
      });
    }

    if (!repositories){
      return res.status(400).json({ error: 'Repository was not found or does not exist'})
    }

    // Verificação de url, caso o usuário esteja tentando colocar uma url
    // já existente(de outro repositório)
    if (url && (url !== repositories.url) ){
      const urlExist = await Repository.findOne({
        where: { url: req.body.url}
      });
  
      if (urlExist) {
        return res.status(400).json({ error: 'Repository already exists.' }); 
      }
    }

    await repositories.update({ title, url, techs });

    return res.json({
      title,
      url,
      techs,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const repositories = await Repository.findByPk(id);

    if (repositories.user_id != req.headers.authorization) {
      return res.status(401).json({
        error: "You don't have permisstion to delete this repository."
      });
    }

    await repositories.destroy();

    return res.json(repositories);
  }

  async storeLike(req, res) {
    const { id } = req.params;

    const repositories = await Repository.findByPk(id);

    const newRepository = {
      likes: repositories.likes + 1,
    }

    await repositories.update(newRepository);

    return res.json(newRepository);
  }
}

module.exports = new RepositoryController();