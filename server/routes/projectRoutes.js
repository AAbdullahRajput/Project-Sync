const express = require('express');
const router = express.Router();
const {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  inviteMember,
  removeMember,
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // all project routes require login

router.route('/').get(getProjects).post(createProject);
router.route('/:id').get(getProjectById).put(updateProject).delete(deleteProject);
router.post('/:id/invite', inviteMember);
router.delete('/:id/members/:userId', removeMember);

module.exports = router;