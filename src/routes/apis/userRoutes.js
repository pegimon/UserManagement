const {Router} = require('express');
const UserController = require('../../controllers/usersController');
const authValidation = require('../../middleware/authValidation');

const router = Router();

router.post('/register', UserController.CreateUser);
router.post('/login', UserController.Login);
router.get('/:id', authValidation, UserController.getUserById);
router.get('/profile', UserController.GetProfile);

module.exports = router;