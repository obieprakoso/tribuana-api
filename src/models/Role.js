const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //  User.belongsTo(models.agency, { foreignKey: 'agency_id', targetKey: 'id' });
    }
  }

  Role.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "role",
      underscored: true,
    }
  );
  Role.associate = (models) => {
    Role.hasMany(models.user, {
      foreignKey: {
        name: "role_id",
        allowNull: true,
      },
      as: "users",
    });
  };
  return Role;
};
