import bcryptjs from 'bcryptjs';
import databaseConfig from '../config/database';
import Person from './Person';

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(databaseConfig);

const User = sequelize.define('user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2, 30],
        msg: 'Campo nome deve ter entre 2 a 30 caracteres',
      },
    },
    unique: {
      args: true,
      msg: 'Usuário já existe',
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8, 11],
        msg: 'Campo nome deve ter entre 8 a 30 caracteres',
      },
    },
    unique: {
      args: true,
      msg: 'Telefone já está sendo utilizado',
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
    unique: {
      args: true,
      msg: 'E-mail já está sendo utilizado',
    },
  },
  password_hash: DataTypes.STRING,
  password: {
    type: DataTypes.VIRTUAL,
    defaultValue: '',
    validate: {
      len: {
        args: [6, 255],
        msg: 'Campo nome deve ter entre 3 a 255 caracteres',
      },
    },
  },
  deleted_at: {
    allowNull: true,
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  tableName: 'users',
  paranoid: true,
  freezeTableName: true,

});

User.addHook('beforeSave', async (user) => {
  if (user.password) {
    // eslint-disable-next-line
    user.password_hash = await bcryptjs.hash(user.password, 8);
  }
});

async function validPassword(password) {
  const valid = await bcryptjs.compare(password, this.password_hash);
  return valid;
}

User.prototype.checkPassword = validPassword;

User.hasOne(Person, { foreignKey: 'user_id', as: 'details' });

export default User;
