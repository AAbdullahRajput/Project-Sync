const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// Register new user
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      return next(new Error('User already exists'));
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

// Login → check email exists → compare password → return token
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      next(new Error('Invalid email or password'));
    }
  } catch (error) {
    next(error);
  }
};

// Get current logged in user (token already verified by middleware)
const getMe = async (req, res) => {
  res.json(req.user);
};

// Update name, bio, avatar, or password
const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      return next(new Error('User not found'));
    }
    user.name = req.body.name || user.name;
    user.bio = req.body.bio || user.bio;
    user.avatar = req.body.avatar || user.avatar;
    if (req.body.password) user.password = req.body.password;
    const updated = await user.save();
    res.json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      avatar: updated.avatar,
      bio: updated.bio,
      token: generateToken(updated._id),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, getMe, updateProfile };