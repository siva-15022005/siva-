const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify JWT token
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from token
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'No user found with this token'
      });
    }

    if (user.isBlocked) {
      return res.status(401).json({
        success: false,
        message: 'Account has been blocked'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is not active'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};

// Admin impersonation middleware
const handleImpersonation = async (req, res, next) => {
  const impersonateId = req.headers['x-impersonate-user'];
  
  if (impersonateId && req.user.role === 'admin') {
    try {
      const impersonatedUser = await User.findById(impersonateId);
      if (impersonatedUser && impersonatedUser.role === 'customer') {
        req.originalUser = req.user; // Store admin user
        req.user = impersonatedUser; // Set impersonated user
        req.isImpersonating = true;
      }
    } catch (error) {
      // Continue with original user if impersonation fails
    }
  }
  
  next();
};

module.exports = {
  protect,
  authorize,
  handleImpersonation
};