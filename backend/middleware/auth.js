import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// middleware/auth.js

// Protect routes - verify token
export const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }

  try {
    // Check if it's the demo token
    if (token === "demo-token-123") {
      req.user = { id: "demo-id", name: "Demo User", email: "demo@gmail.com", role: "farmer" };
      return next();
    }

    // Otherwise, verify as JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    // Add user info to request
    req.user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

// Grant access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user?.role || "unknown"} is not authorized to access this route`,
      });
    }
    next();
  };
};

// Optional authentication - doesn't fail if no token
export const optionalAuth = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (token === "demo-token-123") {
    req.user = { id: "demo-id", name: "Demo User", email: "demo@gmail.com", role: "farmer" };
  } else if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      req.user = {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role
      };
    } catch (error) {
      req.user = null; // unauthenticated
    }
  } else {
    req.user = null; // unauthenticated
  }

  next();
};
