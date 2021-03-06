import * as Sequelize from 'sequelize';

module.exports = (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes) => {

  const ROLE = sequelize.define ('role', {
     // * @prop name 角色名称
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    // * @prop rights 角色的权限
    rights: {
      type: Sequelize.JSONB,
    },
  });

  return ROLE;
};
