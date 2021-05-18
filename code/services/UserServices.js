import database from '../models';
import Person from '../models/Person';

const { default: User } = require('../models/User');
const { default: Services } = require('./Services');

class UserServices extends Services {
  constructor() {
    super(User);
  }

  // Criar usuário
  async store(data) {
    const t = await database.transaction();
    try {
      const user = await User.create(data, { transaction: t });
      await t.commit();
      return user;
    } catch (e) {
      await t.rollback();
      return e;
    }
  }

  // Listar usuários
  async findAll() {
    const users = await this.model.findAll({
      include: [
        {
          all: true,
          attributes: {
            exclude: ['user_id', 'deleted_at', 'id'],
          },
        },
      ],
      attributes: {
        exclude: ['password_hash', 'deleted_at'],
      },
    });
    return users;
  }

  // Encontrar usuário
  async findOne(id) {
    try {
      const data = await this.model.findOne({
        where: {
          id,
        },
        include: [
          {
            all: true,
            attributes: {
              exclude: ['user_id', 'deleted_at', 'id'],
            },
          },
        ],
        attributes: {
          exclude: ['password_hash', 'deleted_at'],
        },
      });
      return data;
    } catch (e) {
      return e;
    }
  }

  // Atualizar usuário
  async update(id, data) {
    const t = await database.transaction();
    try {
      const r = await this.model.update(data, {
        where: {
          id,
        },
      }, { transaction: t });
      await t.commit();
      return r;
    } catch (e) {
      await t.rollback();
      return e;
    }
  }

  async delete(id) {
    const t = await database.transaction();
    try {
      await Person.destroy({
        where: {
          user_id: id,
        },
        force: true,
      }, { transaction: t });

      const user = await this.model.destroy({
        where: {
          id,
        },
        force: true,
      }, { transaction: t });

      await t.commit();
      return user;
    } catch (e) {
      await t.rollback();
      return e;
    }
  }

  // Check user id
  async checkId(id) {
    const check = !!id;
    return check;
  }
}

export default new UserServices();
