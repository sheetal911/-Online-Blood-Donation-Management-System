const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();

//user signup
exports.register = async (req, res) => {
  try {
    const { userId, email, password, name, age, gender, bloodgroup, dob, address, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userId,
      email,
      password: hashedPassword,
      name, 
      age, 
      gender, 
      bloodgroup, 
      dob, 
      address, 
      phone
    });

    await newUser.save();
    console.log('User registered successfully');
    res.status(201).json({ message: 'User registered successfully' });
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

// user login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.userId}, process.env.SECRET);
    console.log("Logged in")

    req.user = token
    res.status(200).json({ token, userId: user.userId });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
