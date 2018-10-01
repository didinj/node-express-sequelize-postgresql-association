var express = require('express');
var router = express.Router();

const companyController = require('../controllers').company;
const branchController = require('../controllers').branch;
const profileController = require('../controllers').profile;
const userController = require('../controllers').user;
const roleController = require('../controllers').role;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Company Router */
router.get('/api/company', companyController.list);
router.get('/api/company/:id', companyController.getById);
router.post('/api/company', companyController.add);
router.put('/api/company/:id', companyController.update);
router.delete('/api/company/:id', companyController.delete);

/* Branch Router */
router.get('/api/branch', branchController.list);
router.get('/api/branch/:id', branchController.getById);
router.post('/api/branch', branchController.add);
router.put('/api/branch/:id', branchController.update);
router.delete('/api/branch/:id', branchController.delete);

/* Profile Router */
router.get('/api/profile', profileController.list);
router.get('/api/profile/:id', profileController.getById);
router.post('/api/profile', profileController.add);
router.put('/api/profile/:id', profileController.update);
router.delete('/api/profile/:id', profileController.delete);

/* User Router */
router.get('/api/user', userController.list);
router.get('/api/user/:id', userController.getById);
router.post('/api/user', userController.add);
router.put('/api/user/:id', userController.update);
router.delete('/api/user/:id', userController.delete);

/* User Role */
router.get('/api/role', roleController.list);
router.get('/api/role/:id', roleController.getById);
router.post('/api/role', roleController.add);
router.put('/api/role/:id', roleController.update);
router.delete('/api/role/:id', roleController.delete);

/* Advance Router */
router.post('/api/role/add_user', roleController.addUser);
router.post('/api/company/add_with_branches', companyController.addWithBranches);

module.exports = router;
