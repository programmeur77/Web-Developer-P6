const Sauce = require('./../models/Sauce');

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
  console.log(sauce);
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

exports.deleteOneSauce = (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce deleted' }))
    .catch((error) => res.status(404).json({ mesage: 'Sauce not found' }));
};
