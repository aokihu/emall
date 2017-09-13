import * as Sequelize from 'sequelize';

export default {
  version: 1,
  tablename: 'user',
  attributes: {
    id: {
      type: Sequelize.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    /**
     * @prop name 用户名
     */
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastLogin: {
      type: Sequelize.DATE,
    },
  },
};
