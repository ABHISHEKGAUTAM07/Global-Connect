const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
  createJob,
  getJobs,
  applyToJob
} = require('../controllers/job.controller');

// Post a job
router.post('/', auth, createJob);

// Get all jobs
router.get('/', auth, getJobs);

// Apply to job
router.post('/apply/:jobId', auth, applyToJob);

module.exports = router;
