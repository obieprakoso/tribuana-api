const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
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

  Payment.init(
    {
      payment_date: DataTypes.DATEONLY, //Format = yyyy-dd-MM
      payment_amount: DataTypes.BIGINT, //Enum
      image: DataTypes.STRING,
      payment_method: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "payment",
      underscored: true,
    }
  );
  Payment.associate = (models) => {
    Payment.belongsTo(models.payment_menu, {
      foreignKey: {
        name: "payment_menu_id",
        allowNull: false,
      },
      as: "payment_menus",
    }),
      Payment.belongsTo(models.user, {
        foreignKey: {
          name: "user_id",
          allowNull: false,
        },
        as: "users",
      });
  };
  return Payment;
};
