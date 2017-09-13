import * as Sequelize from 'sequelize';

export default {
  version: 1,
  tablename: 'role',
  attributes: {
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
  },
};
