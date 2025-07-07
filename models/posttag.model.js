module.exports = (sequelize, DataTypes) => {
  return sequelize.define("PostTag", {
    postId: {
      type: DataTypes.INTEGER,
      references: { model: "Posts", key: "id" }
    },
    tagId: {
      type: DataTypes.INTEGER,
      references: { model: "Tags", key: "id" }
    }
  });
};
