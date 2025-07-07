const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  logging: false
});

// Initialize models
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model")(sequelize, DataTypes);
db.Profile = require("./profile.model")(sequelize, DataTypes);
db.Post = require("./post.model")(sequelize, DataTypes);
db.Tag = require("./tag.model")(sequelize, DataTypes);
db.PostTag = require("./posttag.model")(sequelize, DataTypes);

// Associations

// One-to-One: User ↔ Profile
db.User.hasOne(db.Profile, { foreignKey: "userId", as: "profile" });
db.Profile.belongsTo(db.User, { foreignKey: "userId", as: "user" });

// One-to-Many: User → Posts
db.User.hasMany(db.Post, { foreignKey: "userId", as: "posts" });
db.Post.belongsTo(db.User, { foreignKey: "userId", as: "user" });

// Many-to-Many: Post ↔ Tag (via PostTag)
db.Post.belongsToMany(db.Tag, {
  through: db.PostTag,
  as: "tags",
  foreignKey: "postId"
});
db.Tag.belongsToMany(db.Post, {
  through: db.PostTag,
  as: "posts",
  foreignKey: "tagId"
});

module.exports = db;
