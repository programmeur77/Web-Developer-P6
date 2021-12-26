const bcrypt = require('bcrypt');

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
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(400).json({ error: 'No user data sent' }));
};
exports.login = (req, res, next) => {};
