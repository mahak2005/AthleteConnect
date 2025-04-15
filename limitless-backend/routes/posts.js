const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Create a new post
router.post('/', auth, async (req, res) => {
  try {
    console.log('Creating post with data:', { content: req.body.content, image: req.body.image });
    console.log('User ID from token:', req.user.id);

    const { content, image } = req.body;

    // Validate content
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ msg: 'Post content cannot be empty' });
    }

    const post = new Post({
      user: req.user.id,
      content: content.trim(),
      image
    });

    console.log('Post object before save:', post);

    await post.save();
    console.log('Post saved successfully');

    // Populate athlete data with relevant fields
    await post.populate('user', 'name image basicInfo.sport country');
    console.log('Post after population:', post);

    res.status(201).json({
      _id: post._id,
      user: {
        _id: post.user._id,
        name: post.user.name,
        image: post.user.image,
        sport: post.user.basicInfo.sport,
        country: post.user.country
      },
      content: post.content,
      image: post.image,
      likes: post.likes,
      comments: post.comments,
      createdAt: post.createdAt
    });
  } catch (err) {
    console.error('Error creating post:', err);
    console.error('Error stack:', err.stack);
    res.status(500).json({
      msg: 'Server error while creating post',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Get all posts
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name image basicInfo.sport country')
      .populate('comments.user', 'name image');

    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ msg: 'Server error while fetching posts' });
  }
});

// Like a post
router.put('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const userId = req.user.id;
    const likeIndex = post.likes.indexOf(userId);

    if (likeIndex === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(likeIndex, 1);
    }

    await post.save();
    res.json({ likes: post.likes });
  } catch (err) {
    console.error('Error updating post like:', err);
    res.status(500).json({ msg: 'Server error while updating post like' });
  }
});

// Add comment to post
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ msg: 'Comment content cannot be empty' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const newComment = {
      user: req.user.id,
      content: content.trim()
    };

    post.comments.unshift(newComment);
    await post.save();

    // Populate the new comment's user data
    await post.populate('comments.user', 'name image');

    res.status(201).json(post.comments);
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ msg: 'Server error while adding comment' });
  }
});

module.exports = router; 