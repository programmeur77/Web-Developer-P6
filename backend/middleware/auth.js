/**
 * Authentication middleware to protect sauce Routes
 * @author Benoît Puech
 * @
 */
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.decode(token, process.env.JWT_AUTH_STRING);
    const userId = decodedToken.userId;
    req.auth = { userId };
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
