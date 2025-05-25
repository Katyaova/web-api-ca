import express from 'express';
import User from './userModel.js';
import UserList from './userListModel.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const router = express.Router();


const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ success: false, msg: "No token provided." });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded.id; 
    next();
  } catch (err) {
    return res.status(401).json({ success: false, msg: "Invalid token." });
  }
};


async function registerUser(req, res) {
  await User.create(req.body);
  res.status(201).json({ success: true, msg: 'User successfully created.' });
}


async function authenticateUser(req, res) {
  const user = await User.findByUserName(req.body.username);
  if (!user) {
    return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
  }

  const isMatch = await user.comparePassword(req.body.password);
  if (isMatch) {
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET);
    res.status(200).json({ success: true, token: 'BEARER ' + token });
  } else {
    res.status(401).json({ success: false, msg: 'Wrong password.' });
  }
}



router.get('/', asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
}));


router.post('/', asyncHandler(async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ success: false, msg: 'Username and password required.' });
  }

  if (req.query.action === 'register') {
    await registerUser(req, res);
  } else {
    await authenticateUser(req, res);
  }
}));


router.use(authenticate);


router.get('/favorites', asyncHandler(async (req, res) => {
  const userList = await UserList.findOne({ userId: req.userId });
  res.status(200).json(userList?.favorites || []);
}));


router.post('/favorites', asyncHandler(async (req, res) => {
  const { movieId } = req.body;
  let userList = await UserList.findOne({ userId: req.userId });

  if (!userList) {
    userList = new UserList({ userId: req.userId, favorites: [], mustWatch: [] });
  }

  if (!userList.favorites.includes(movieId)) {
    userList.favorites.push(movieId);
    await userList.save();
  }

  res.status(201).json(userList.favorites);
}));


router.get('/mustwatch', asyncHandler(async (req, res) => {
  const userList = await UserList.findOne({ userId: req.userId });
  res.status(200).json(userList?.mustWatch || []);
}));


router.post('/mustwatch', asyncHandler(async (req, res) => {
  const { movieId } = req.body;
  let userList = await UserList.findOne({ userId: req.userId });

  if (!userList) {
    userList = new UserList({ userId: req.userId, favorites: [], mustWatch: [] });
  }

  if (!userList.mustWatch.includes(movieId)) {
    userList.mustWatch.push(movieId);
    await userList.save();
  }

  res.status(201).json(userList.mustWatch);
}));

export default router;
