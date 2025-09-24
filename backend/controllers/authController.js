import crypto from 'crypto';
import User from '../models/User.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

// 🔹 Demo user details (static)
const DEMO_USER = {
  id: 'demo-id',
  name: 'Demo User',
  email: 'demo@gmail.com',
  phone: '9999999999',
  role: 'farmer',
  language: 'en',
  isVerified: true,
  profile: { bio: 'Demo account for testing' },
  location: {
    type: 'Point',
    coordinates: [77.1025, 28.7041],
    address: 'Delhi',
    state: 'Delhi',
    district: 'New Delhi',
    pincode: '110001'
  },
  preferences: {},
  createdAt: new Date()
};

// ============================================================
// @desc    Register user (DISABLED in demo)
// @route   POST /api/auth/register
// @access  Public
// ============================================================
export const register = asyncHandler(async (req, res) => {
  return res.status(403).json({
    success: false,
    message: 'Registration disabled in demo mode. Use demo@gmail.com / 123456 to login.'
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

  // ✅ Accept any credentials for login
  const user = {
    ...DEMO_USER,
    email: email,
    name: email.split('@')[0] || 'User', // Use part before @ as name
  };

  return res.status(200).json({
    success: true,
    message: 'Login successful',
    token: 'demo-token-123',
    user: user
  });
});

// ============================================================
// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
// ============================================================
export const getMe = asyncHandler(async (req, res) => {
  // Accept demo token from header
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : null;

  if (token === 'demo-token-123') {
    return res.status(200).json({ success: true, user: DEMO_USER });
  }

  return res.status(401).json({ success: false, message: 'Unauthorized' });
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
