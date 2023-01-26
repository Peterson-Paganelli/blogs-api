const UserModel = (sequelize, Datatypes) => {
  const User  = sequelize.define('User', {
    id: Datatypes.INTEGER,
    display_name: Datatypes.STRING,
    email: Datatypes.STRING,
    password: Datatypes.STRING,
    image: Datatypes.STRING,
  })
  return User;
};

module.exports = UserModel;