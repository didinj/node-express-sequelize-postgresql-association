const express = require("express");
const app = express();
const db = require("./models");

app.use(express.json());

// Sync DB
db.sequelize.sync({ force: true }).then(() => {
  console.log("Database synced");
});

app.use("/api/users", require("./routes/user.routes"));
app.use("/api/posts", require("./routes/post.routes"));
app.use("/api/tags", require("./routes/tag.routes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
