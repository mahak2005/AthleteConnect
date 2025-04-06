const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Create a new post
router.post('/', auth, async (req, res) => {
  try {
    const { content, image } = req.body;
    const post = new Post({
      user: req.user.id,
      content,
      image
    });
    await post.save();
    await post.populate('user', 'name image sport country');
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all posts
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name image sport country')
      .populate('comments.user', 'name image');
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Like a post
router.put('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check if post has already been liked
    if (post.likes.includes(req.user.id)) {
      post.likes = post.likes.filter(like => like.toString() !== req.user.id);
    } else {
      post.likes.push(req.user.id);
    }

    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add comment to post
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const newComment = {
      user: req.user.id,
      content: req.body.content
    };

    post.comments.unshift(newComment);
    await post.save();
    await post.populate('comments.user', 'name image');
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 