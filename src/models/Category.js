module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Category', {
      id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
    }, {
      timestamps: false,
      tableName: 'categories',
      underscored: true,
    });
    return User;
  };