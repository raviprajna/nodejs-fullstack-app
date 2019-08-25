const User = require('../models').User;
const Hotel = require('../models').Hotel;

module.exports = {
  list(req, res) {
    return User
      .findAll(
      {
        include: [{
          model: Hotel,
          as: 'hotels'
        }]
      }
      )
      .then((users) => res.status(200).send(users))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return User
      .findByPk(req.params.id, {
        include: [{
          model: Hotel,
          as: 'hotels'
        }],
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return User
      .create({
        user_name: req.body.user_name,
        user_city: req.body.user_city,
      })
      .then((user) => res.status(201).send(user))
      .catch((error) => res.status(400).send(error));
  },

  addWithHotels(req, res) {
    return User
      .create({
        user_name: req.body.user_name,
        user_city: req.body.user_city,
        hotels: req.body.hotels,
      }, {
      	include: [{
          model: Hotel,
          as: 'hotels'
        }]
      })
      .then((user) => res.status(201).send(user))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    console.log(req.body);
    return User
      .findByPk(req.params.id, {
        include: [{
          model: Hotel,
          as: 'hotels'
        }],
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return user
          .updateAttributes({
            user_name: req.body.user_name || user.user_name,
            user_city: req.body.user_city || user.user_city,
            hotels: req.body.hotels || user.hotels,
          }, {
          	include: [{
              model: Hotel,
              as: 'hotels'
            }]
          })
          .then(() => res.status(200).send(user))
          .catch((error) => {console.log(error);res.status(400).send(error);});
      })
      .catch((error) => {console.log(error);res.status(400).send(error);});
  },

  delete(req, res) {
    return User
      .findByPk(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(400).send({
            message: 'User Not Found',
          });
        }
        return user
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
