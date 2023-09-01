const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PaymentMenu extends Model {
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

  PaymentMenu.init(
    {
      name: DataTypes.STRING,
      position: DataTypes.INTEGER,
      is_active: DataTypes.BOOLEAN,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "payment_menu",
      underscored: true,
    }
  );
  PaymentMenu.associate = (models) => {
    PaymentMenu.hasMany(models.payment, {
      foreignKey: {
        name: "payment_menu_id",
        allowNull: false,
      },
      as: "payments",
    });
  };
  return PaymentMenu;
};
