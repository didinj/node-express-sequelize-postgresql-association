const Role = require('../models').Role;
const User = require('../models').User;

module.exports = {
  list(req, res) {
    return Role
      .findAll({
        include: [{
          model: User,
          as: 'users'
        }],
      })
      .then((roles) => res.status(200).send(roles))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Role
      .findById(req.params.id, {
        include: [{
          model: User,
          as: 'users'
        }],
      })
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Not Found',
          });
        }
        return res.status(200).send(role);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Role
      .create({
        role_name: req.body.role_name,
      })
      .then((role) => res.status(201).send(role))
      .catch((error) => res.status(400).send(error));
  },

  addUser(req, res) {
    return Role
      .findById(req.body.role_id, {
        include: [{
          model: User,
          as: 'users'
        }],
      })
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Not Found',
          });
        }
        User.findById(req.body.role_id).then((course) => {
          if (!course) {
            return res.status(404).send({
              message: 'User Not Found',
            });
          }
          role.addUser(course);
          return res.status(200).send(role);
        })
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Role
      .findById(req.params.id, {
        include: [{
          model: User,
          as: 'users'
        }],
      })
      .then(role => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Not Found',
          });
        }
        return role
          .update({
            role_name: req.body.role_name || classroom.role_name,
          })
          .then(() => res.status(200).send(role))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Role
      .findById(req.params.id)
      .then(role => {
        if (!role) {
          return res.status(400).send({
            message: 'Role Not Found',
          });
        }
        return role
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
