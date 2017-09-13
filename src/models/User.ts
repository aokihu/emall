import * as Sequelize from 'sequelize';

export default {
  version: 1,
  tablename: 'user',
  attributes: {
     // * @prop name 用户名
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    // * @props password 用户密码
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    // * @props avatar 用户头像
    avatar: {
      type: Sequelize.TEXT,
    },
    // * @props lastLogin 最后登陆时间
    lastLogin: {
      type: Sequelize.DATE,
    },
    // * @props rights 用户的执行权利
    rights: {
      type: Sequelize.JSONB,
    },
  },
};
