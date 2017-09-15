import * as Sequelize from 'sequelize';

module.exports = (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes) => {

  const ORDER = sequelize.define ('order', {
     // @prop uuid 订单的唯一编号
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
      allowNull: false,
    },
    // @prop rights 订单中的商品
    items: {
      type: Sequelize.JSONB,
    },
    // @prop price 未计算折扣之前的产品总体价格
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    // @prop final_amount 交易总金额,包括运费,税费,以及打折后的最终支付金额
    final_amount: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    // @prop freight 运费
    freight: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    // @prop discount 折扣率，最高1, 最低0.5
    discount: {
      type: Sequelize.REAL,
      allowNull: false,
      defaultValue: 1,
    },
    // @prop payment 支付方式
    payment: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'wechat',
    },
  });

  const CUSTOMER = sequelize.import('./customer');
  ORDER.belongsTo(CUSTOMER);
  CUSTOMER.hasMany(ORDER);

  return ORDER;
};
