const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = (req, res, next) => {
  console.log('req: ', req.cookies);
  const {cookies} = req;
  console.log('cookies: ', cookies.token);
  if (!cookies?.token) return res.status(401).send('Token required.');
  const token = cookies.token;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token');
    }
    req.userId = decoded.userId;
    console.log('decoded.userId: ', decoded);
  });
  next();
};

const passwordMatch = (req, res, next) => {
  const repPassword = req.body.repPassword;
  console.log('repPassword: ', repPassword);
  if (!repPassword) {
    return res.status(400).send({ error: 'Please, provide repPassword field' });
  }
  const isMatch = req.body.password !== repPassword;
  if (isMatch) {
    return res
      .status(400)
      .send('Incorrect password. Please double-check your password.');
  }
  next();
};

const verifyPassword = async (req, res, next) => {
    console.log('verifyPassword: ');
  try {
    const { email, password } = req.body;
    console.log('password: ', password);
    const user = await User.findOne({ email: email });
    if (!user) {
        console.log('user');
        
        return res
        .status(400)
        .send({ error: 'User not found. Please log in again.' });
    }
    
    const isVerified = await bcrypt.compare(password, user.password);
    if (!isVerified) {
      return res
      .status(400)
      .send({ error: 'Wrong password. Please try again.' });
    }
    req.body.userId = user._id;
    next();
  } catch (error) {
    console.log('error: ', error);
  }
};



module.exports = { verifyPassword, passwordMatch, verifyToken };
