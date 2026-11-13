import express from 'express';
import {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication
} from '../controllers/applicationController.js';
import { validateApplication } from '../middleware/validateApplication.js';

const router = express.Router();

router.get('/', getApplications);
router.get('/:id', getApplicationById);
router.post('/', validateApplication, createApplication);
router.put('/:id', validateApplication, updateApplication);
router.delete('/:id', deleteApplication);

export default router;
