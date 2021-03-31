const favorited = (sequelize, DataTypes) => {
  const Favorite = sequelize.define("favorite", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
      
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    favorited: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  return Favorite;
};

export default favorited;
