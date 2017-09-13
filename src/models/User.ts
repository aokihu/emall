import * as Sequelize from 'sequelize';

module.exports = (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes) => {

  const USER = sequelize.define('user', {
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
      type: Sequelize.BLOB,
    },
    // * @props lastLogin 最后登陆时间
    lastLogin: {
      type: Sequelize.DATE,
    },
    // * @props rights 用户的执行权利
    rights: {
      type: Sequelize.JSONB,
    },
  });

  // 定义<USER>与<ROLE>的关系
  // ROLE has many USER
  const ROLE = sequelize.import('./role');
  ROLE.hasMany(USER);

  return USER;
};
