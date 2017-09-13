import * as Sequelize from 'sequelize';

module.exports = (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes) => {
  return sequelize.define('product', {
     // * @prop title 产品名称
    title: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
  });
};
