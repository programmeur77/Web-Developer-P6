/**
 * Authentication middleware to protect sauce Routes
 * @author Benoît Puech
 * @
 */
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.decode(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user Id';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Unauthorized request')
    });
  }
};
