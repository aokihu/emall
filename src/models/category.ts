import * as Sequelize from 'sequelize';

module.exports = (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes) => {

  const CATEGORY = sequelize.define('category', {
     // * @prop title 产品名称
    title: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
  });

  return CATEGORY;
};
