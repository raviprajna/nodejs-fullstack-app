const Hotel = require('../models').Hotel;
const User = require('../models').User;

module.exports = {
  list(req, res) {
    return Hotel
      .findAll()
      .then((hotels) => res.status(200).send(hotels))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Hotel
      .findByPk(req.params.id)
      .then((hotel) => {
        if (!hotel) {
          return res.status(404).send({
            message: 'Hotel Not Found',
          });
        }
        return res.status(200).send(hotel);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Hotel
      .create({
        user_id: req.body.user_id,
        hotel_name: req.body.hotel_name,
        hotel_address: req.body.hotel_address,
        hotel_city: req.body.hotel_city,
      })
      .then((hotel) => res.status(201).send(hotel))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Hotel
      .findByPk(req.params.id)
      .then(hotel => {
        if (!hotel) {
          return res.status(404).send({
            message: 'Hotel Not Found',
          });
        }
        return hotel
          .update({
            hotel_name: req.body.hotel_name || user.hotel_name,
            hotel_address: req.body.hotel_address || user.hotel_address,
            hotel_city: req.body.hotel_city || user.hotel_city,
          })
          .then(() => res.status(200).send(hotel))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Hotel
      .findByPk(req.params.id)
      .then(hotel => {
        if (!hotel) {
          return res.status(400).send({
            message: 'Hotel Not Found',
          });
        }
        return hotel   
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
