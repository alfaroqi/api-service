module.exports = (sequelize, DataTypes) => {
  const resfreshToken = sequelize.define(
    "RefreshToken",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        field: "created_at",
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        field: "updated_at",
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "refresh_tokens",
      timestamps: true,
    }
  );

  return resfreshToken;
};
