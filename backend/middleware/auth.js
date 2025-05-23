const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Strip 'Bearer' prefix

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // 👈 Uses the secret

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user; // Attach user to request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
