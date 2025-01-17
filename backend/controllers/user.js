const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoMask = require('mongo-mask');

const User = require('./../models/User');

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user
        .save()
        .then((user) => res.status(201).json(user))
        .catch((error) =>
          res.status(500).json({ error: 'Cet email est déjà utilisé' })
        );
    })
    .catch((error) => res.status(400).json({ error: 'No user data sent' }));
};
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ message: 'Cet utilisateur est introuvable' });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(404).json({ message: 'Mot de passe incorrect!' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.JWT_AUTH_STRING, {
              expiresIn: '24h'
            })
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
