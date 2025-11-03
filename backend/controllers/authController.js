import crypto from 'crypto';
import User from '../models/User.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

// ============================================================
// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
// ============================================================
export const register = asyncHandler(async (req, res) => {
  const { name, email, phone, password, language } = req.body;

  // Validation
  if (!name || !email || !phone || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, email, phone, and password'
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters long'
    });
  }

  // Phone number validation (Indian format)
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid 10-digit Indian phone number'
    });
  }

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email: email.toLowerCase() }, { phone }]
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User with this email or phone number already exists'
    });
  }

  // Create user
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    phone,
    password,
    language: language || 'en',
    role: 'farmer',
    isVerified: true, // For demo purposes, auto-verify
    location: {
      type: 'Point',
      coordinates: [77.1025, 28.7041], // Default to Delhi
      address: 'Delhi',
      state: 'Delhi',
      district: 'New Delhi',
      pincode: '110001'
    },
    profile: { bio: 'New user account' },
    preferences: {}
  });

  // Generate JWT token
  const token = user.getSignedJwtToken();

  // Remove password from response
  user.password = undefined;

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token,
    user
  });
});

// ============================================================
// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
// ============================================================
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password'
    });
  }

  // Check for user and include password for comparison
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Generate JWT token
  const token = user.getSignedJwtToken();

  // Remove password from response
  user.password = undefined;

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    user
  });
});

// ============================================================
// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
// ============================================================
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user
  });
});

// ============================================================
// @desc    Update user details (disabled in demo)
// @route   PUT /api/auth/updatedetails
// @access  Private
// ============================================================
export const updateDetails = asyncHandler(async (req, res) => {
  return res.status(403).json({
    success: false,
    message: 'Profile updates disabled in demo mode'
  });
});

// ============================================================
// @desc    Update password (disabled in demo)
// @route   PUT /api/auth/updatepassword
// @access  Private
// ============================================================
export const updatePassword = asyncHandler(async (req, res) => {
  return res.status(403).json({
    success: false,
    message: 'Password update disabled in demo mode'
  });
});

// ============================================================
// @desc    Logout user
// @route   GET /api/auth/logout
// @access  Private
// ============================================================
export const logout = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully (demo)'
  });
});

// ============================================================
// @desc    Forgot password (disabled in demo)
// @route   POST /api/auth/forgotpassword
// @access  Public
// ============================================================
export const forgotPassword = asyncHandler(async (req, res) => {
  return res.status(403).json({
    success: false,
    message: 'Forgot password disabled in demo mode'
  });
});

// ============================================================
// @desc    Reset password (disabled in demo)
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Public
// ============================================================
export const resetPassword = asyncHandler(async (req, res) => {
  return res.status(403).json({
    success: false,
    message: 'Reset password disabled in demo mode'
  });
});
