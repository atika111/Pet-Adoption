const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const signup = asyncHandler(async (req, res) => {
  const userImageFromUpload = req?.file?.path;
  const defaultImage = req.body.avatarImage;
  const {
    password,
    repPassword,
    email,
    firstName,
    lastName,
    address,
    phoneNumber,
  } = req.body;
  // || !role
  if (!password || !repPassword || !firstName) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check matching password
    if (repPassword !== password) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: "Email address is already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const picture = userImageFromUpload || defaultImage || null;

    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      address,
      phoneNumber,
      picture,
    });

    await newUser.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function login(req, res) {
  const userId = req.body.userId.valueOf();
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
  
    console.log('userId: ', userId);
    const token = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET);

    res.cookie("token", token, { httpOnly: false});

    res.status(200).send({
      userId: user._id,
      nickname: user.nickname,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      picture: user.picture,
      token: token
    });
  } catch (error) {
    console.log("error: ", error);
    console.error("Error finding user by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

function logout(req, res) {
  res.clearCookie("token");
  res.send("Cookie has been deleted successfully");
}

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");

  if (!users.length) {
    return res.status(404).json({ message: "Users not found" });
  }

  res.status(200).json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;

    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(400).json({ message: "User not exist" });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error("error: ", error.message);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  if (!Object.keys(updatedUserData).length > 0) {
    return res.status(400).json({ message: "No data to be updated" });
  }

  try {
    if (updatedUserData.password) {
      const hashedPassword = await bcrypt.hash(updatedUserData.password, 10);
      updatedUserData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
    res.status(200).json({ message: "User updated successfully",  updatedUser});
  } catch (error) {}
});

const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) {
    return res.status(400).json({ message: "Could not delete user" });
  }

  res.status(200).json({ message: "User deleted successfully", });
});

async function getUserByToken(req, res) {
  console.log("getUserByToken: ");
  const { userId } = req;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const userData = {
      nickname: user.nickname,
      firstName: user.firstName,
      userId: user._id,
      email: user.email,
      admin: user.isAdmin,
      picture: user.picture,
    };

    return res.send(userData);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  signup,
  login,
  logout,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByToken,
};

//TODO: Protected to logged-in users
// TODO: Add picture functionality
