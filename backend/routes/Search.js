const Post  = require("../models/Postmodel.js")
const express = require("express");
const router = express.Router();

// GET /look/search?query=someText
router.get('/search', async (req, res) => {
  const query = req.query.query;
  const posts = await Post.find({
    topic: { $regex: query, $options: 'i' },
  }).select('topic slug'); // just return topic + slug
  res.json(posts);
});


module.exports = router