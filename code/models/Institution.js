import User from './User';
import databaseConfig from '../config/database';

const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(databaseConfig);

class Institution extends Model {}

Institution.init({
  name: {
    type: DataTypes.STRING(255),
    defaultValue: '',
    allowNull: false,
    validate: {
      len: {
        args: [3, 255],
        msg: 'Campo deve ter entre 3 a 255 caracteres',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
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
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  deleted_at: {
    allowNull: true,
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  tableName: 'institution',
  paranoid: true,
  freezeTableName: 'institution',
});

User.hasOne(Institution, { foreignKey: 'user_id', as: 'instituition' });
Institution.hasOne(User, { foreignKey: 'id', as: 'user' });

export default Institution;
