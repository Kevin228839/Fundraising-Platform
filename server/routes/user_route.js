const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user_controller');

router.post('/api/v1/usergooglelogin', UserController.userGoogleLogin);
router.post('/api/v1/userlogout', UserController.verifyAccess, UserController.userLogout);
router.get('/api/v1/user', UserController.verifyAccess, UserController.getUserData);
router.put('/api/v1/setwallet', UserController.verifyAccess, UserController.setWallet);
router.post('/api/v1/refresh', UserController.verifyRefresh);

module.exports = router;
