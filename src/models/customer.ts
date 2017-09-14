import * as Sequelize from 'sequelize';

module.exports = (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes) => {
  return sequelize.define('customer', {
     // * @prop title 产品名称
    nickname: {
      type: Sequelize.STRING,
    },
    realname: {
      type: Sequelize.STRING,
    },
  });
};
