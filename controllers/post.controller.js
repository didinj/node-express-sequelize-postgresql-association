const db = require("../models");
const { Post, User, Tag } = db;

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: ["user", "tags"]
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addTagToPost = async (req, res) => {
  try {
    const { postId, tagId } = req.body;
    const post = await Post.findByPk(postId);
    const tag = await Tag.findByPk(tagId);
    if (post && tag) {
      await post.addTag(tag);
      res.json({ message: "Tag added to post." });
    } else {
      res.status(404).json({ message: "Post or Tag not found." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
