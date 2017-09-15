import * as Sequelize from 'sequelize';

module.exports = (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes) => {
  const PRODUCT = sequelize.define('product', {
    // @prop title 产品名称
    title: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    // @prop stock 库存数量
    stock: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    // @prop price 销售价格
    price: {
      type: Sequelize.DOUBLE,
      defaultValue: 0,
    },

  });

  const CATEGORY = sequelize.import('./category');
  CATEGORY.hasMany(PRODUCT);

  return PRODUCT;
};
