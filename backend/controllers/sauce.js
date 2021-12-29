const fs = require('fs');

const { restartDelay } = require('concurrently/src/defaults');
const { json } = require('express');
const Sauce = require('./../models/Sauce');
const { error } = require('console');

exports.postOneSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    userLiked: [],
    userDisliked: []
  });
  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: 'Nouvelle sauce créée' });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ message: 'Sauce not found' }));
};

exports.modifySauce = (req, res, next) => {
  let sauce = req.file;
  if (sauce) {
    sauce = {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`
    };
  } else {
    sauce = {
      ...req.body
    };
  }

  Sauce.updateOne({ ...sauce, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce updated !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId === req.auth.userId) {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce deleted' }))
            .catch((error) => res.status(500).json({ error }));
        });
      } else {
        return res.status(401).json({ message: 'Unauthorized request' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
