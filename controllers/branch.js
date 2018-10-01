const Branch = require('../models').Branch;
const Company = require('../models').Company;

module.exports = {
  list(req, res) {
    return Branch
      .findAll({
        include: [{
          model: Company,
          as: 'company'
        }],
      })
      .then((branches) => res.status(200).send(branches))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Branch
      .findById(req.params.id, {
        include: [{
          model: Company,
          as: 'company'
        }],
      })
      .then((branch) => {
        if (!branch) {
          return res.status(404).send({
            message: 'Branch Not Found',
          });
        }
        return res.status(200).send(branch);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Branch
      .create({
        company_id: req.body.company_id,
        branch_name: req.body.branch_name,
        branch_address: req.body.branch_address,
        branch_city: req.body.branch_city,
      })
      .then((branch) => res.status(201).send(branch))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Branch
      .findById(req.params.id, {
        include: [{
          model: Company,
          as: 'company'
        }],
      })
      .then(branch => {
        if (!branch) {
          return res.status(404).send({
            message: 'Branch Not Found',
          });
        }
        return branch
          .update({
            branch_name: req.body.branch_name || company.branch_name,
            branch_address: req.body.branch_address || company.branch_address,
            branch_city: req.body.branch_city || company.branch_city,
          })
          .then(() => res.status(200).send(branch))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Branch
      .findById(req.params.id)
      .then(branch => {
        if (!branch) {
          return res.status(400).send({
            message: 'Branch Not Found',
          });
        }
        return branch
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
