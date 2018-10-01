const Company = require('../models').Company;
const Branch = require('../models').Branch;

module.exports = {
  list(req, res) {
    return Company
      .findAll({
        include: [{
          model: Branch,
          as: 'branches'
        }],
      })
      .then((companies) => res.status(200).send(companies))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Company
      .findById(req.params.id, {
        include: [{
          model: Branch,
          as: 'branches'
        }],
      })
      .then((company) => {
        if (!company) {
          return res.status(404).send({
            message: 'Company Not Found',
          });
        }
        return res.status(200).send(company);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Company
      .create({
        company_name: req.body.company_name,
        company_address: req.body.company_address,
        company_city: req.body.company_city,
      })
      .then((company) => res.status(201).send(company))
      .catch((error) => res.status(400).send(error));
  },

  addWithBranches(req, res) {
    return Company
      .create({
        company_name: req.body.company_name,
        company_address: req.body.company_address,
        company_city: req.body.company_city,
        branches: req.body.branches,
      }, {
      	include: [{
          model: Branch,
          as: 'branches'
        }]
      })
      .then((company) => res.status(201).send(company))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    console.log(req.body);
    return Company
      .findById(req.params.id, {
        include: [{
          model: Branch,
          as: 'branches'
        }],
      })
      .then(company => {
        if (!company) {
          return res.status(404).send({
            message: 'Company Not Found',
          });
        }
        return company
          .updateAttributes({
            company_name: req.body.company_name || company.company_name,
            company_address: req.body.company_address || company.company_address,
            company_city: req.body.company_city || company.company_city,
            branches: req.body.branches || company.branches,
          }, {
          	include: [{
              model: Branch,
              as: 'branches'
            }]
          })
          .then(() => res.status(200).send(company))
          .catch((error) => {console.log(error);res.status(400).send(error);});
      })
      .catch((error) => {console.log(error);res.status(400).send(error);});
  },

  delete(req, res) {
    return Company
      .findById(req.params.id)
      .then(company => {
        if (!company) {
          return res.status(400).send({
            message: 'Company Not Found',
          });
        }
        return company
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
