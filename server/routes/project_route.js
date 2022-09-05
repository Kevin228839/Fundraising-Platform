const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/project_controller');

router.get('/api/v1/projectlist', ProjectController.getProjectList);
router.get('/api/v1/projectdetail', ProjectController.getProjectDetail);

module.exports = router;
