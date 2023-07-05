const UserDataModel = (sequelize, DataTypes) => {
  const UserData = sequelize.define('UserData', {
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    verifyCode: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cart: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {}
    }
  });



  return UserData;
};

export default UserDataModel;
