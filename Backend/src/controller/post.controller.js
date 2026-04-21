const postModel = require('../models/post.model');
const generateImageCaption = require('../service/ai.service');
const uploadFile = require('../service/storage.service');
const { v4: uuidv4 } = require('uuid');

async function createPostController(req, res) {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No image uploaded' });

    let caption;
    try {
      const base64Image = file.buffer.toString('base64');
      caption = await generateImageCaption(base64Image);
    } catch {
      caption = 'A beautiful moment captured. #photography #vibes ✨';
    }

    const storageResult = await uploadFile(file.buffer, uuidv4());

    const newPost = await postModel.create({
      image: storageResult.url,
      caption,
      userId: req.user._id,
    });

    const populatedPost = await postModel.findById(newPost._id).populate('userId', 'username');

    res.status(201).json({
      message: 'Post created successfully',
      post: populatedPost,
    });
  } catch (error) {
    console.error('Controller Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

async function getFeedController(req, res) {
  try {
    const posts = await postModel
      .find()
      .populate('userId', 'username')
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching feed' });
  }
}

module.exports = { createPostController, getFeedController };