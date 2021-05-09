import UserServices from '../services/UserServices';

class UserController {
  // Método para criar novo usuário
  async store(req, res) {
    try {
      return res.json(await UserServices.store(req.body));
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }

  // Método para listar usuários
  async index(req, res) {
    try {
      const users = await UserServices.findAll();
      return res.json(users);
    } catch (e) {
      return res.status(400).json({ errors: e });
    }
  }

  // Método para listar um usuário
  async show(req, res) {
    try {
      const user = await UserServices.findOne(req.params.id);
      return res.json(user);
    } catch (e) {
      return res.status(400).json({ errors: e });
    }
  }

  // Método para atualizar dados do usuários
  async update(req, res) {
    try {
      const id = req.userId;
      const data = req.body;
      const checkId = await UserServices.checkId(id);
      if (!checkId) {
        return res.status(404).json({
          errors: ['Id não encontrado'],
        });
      }

      const user = await UserServices.findOne(id);
      if (!user) {
        return res.status(404).json({
          errors: ['Usuário não existe'],
        });
      }
      await UserServices.update(id, data);
      return res.json(data);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  // Método para excluir dados do usuário
  async delete(req, res) {
    try {
      const id = req.userId;
      const checkId = await UserServices.checkId(id);
      if (!checkId) {
        return res.status(404).json({
          errors: ['Id não encontrado'],
        });
      }

      const user = await UserServices.findOne(id);
      if (!user) {
        return res.status(404).json({
          errors: ['Usuário não existe'],
        });
      }
      await UserServices.delete(id);

      return res.json({ message: 'Usuário deletado' });
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }
}

export default new UserController();
