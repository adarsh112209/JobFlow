const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// --- NEW VALIDATION HELPER FUNCTION ---
const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/;
  return passwordRegex.test(password);
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
  const { firstName, lastName, dob, phone, nationality, email, password } = req.body;

  // --- ADDED VALIDATION CHECK ---
  if (!validatePassword(password)) {
    return res.status(400).json({ 
      message: 'Password must be 6-15 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.' 
    });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({ firstName, lastName, dob, phone, nationality, email, password });
    res.status(201).json({
      _id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpire = Date.now() + 10 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Your Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: `OTP has been sent to your email.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const resetPasswordWithOtp = async (req, res) => {
  const { email, otp, password } = req.body;

  // --- ADDED VALIDATION CHECK ---
  if (!validatePassword(password)) {
    return res.status(400).json({ 
      message: 'Password must meet the criteria: 6-15 characters, one uppercase, one lowercase, one number, one special character.' 
    });
  }

  try {
    const user = await User.findOne({
      email,
      otp,
      otpExpire: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: 'Invalid OTP or OTP has expired' });
    }
    user.password = password;
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();
    res.status(200).json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { registerUser, loginUser, forgotPassword, resetPasswordWithOtp };