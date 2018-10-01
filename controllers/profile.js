const Profile = require('../models').Profile;
const User = require('../models').User;

module.exports = {
  list(req, res) {
    return Profile
      .findAll({
        include: [{
          model: User,
          as: 'user'
        }],
      })
      .then((profiles) => res.status(200).send(profiles))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Profile
      .findById(req.params.id, {
        include: [{
          model: User,
          as: 'user'
        }],
      })
      .then((profile) => {
        if (!profile) {
          return res.status(404).send({
            message: 'Profile Not Found',
          });
        }
        return res.status(200).send(profile);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Profile
      .create({
        user_id: req.body.user_id,
        fullname: req.body.fullname,
        birthdate: req.body.birthdate,
        gender: req.body.gender,
        position: req.body.position,
      })
      .then((profile) => res.status(201).send(profile))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Profile
      .findById(req.params.id, {
        include: [{
          model: User,
          as: 'user'
        }],
      })
      .then(profile => {
        if (!profile) {
          return res.status(404).send({
            message: 'Profile Not Found',
          });
        }
        return profile
          .update({
            user_id: req.body.user_id || classroom.user_id,
            fullname: req.body.fullname || classroom.fullname,
            birthdate: req.body.birthdate || classroom.birthdate,
            gender: req.body.gender || classroom.gender,
            position: req.body.position || classroom.position,
          })
          .then(() => res.status(200).send(profile))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Profile
      .findById(req.params.id)
      .then(profile => {
        if (!profile) {
          return res.status(400).send({
            message: 'Profile Not Found',
          });
        }
        return profile
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
