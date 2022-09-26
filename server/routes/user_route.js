const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user_controller');

router.post('/api/v1/usergooglelogin', UserController.userGoogleLogin);
router.delete('/api/v1/userlogout', UserController.userLogout);
router.get('/user', UserController.user);

module.exports = router;
