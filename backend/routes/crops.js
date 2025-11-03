import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getCrops,
  getCrop,
  createCrop,
  updateCrop,
  deleteCrop
} from '../controllers/cropController.js';

const router = express.Router();

// Public routes
router.get('/', getCrops);
router.get('/:id', getCrop);

// Protected routes
router.post('/', protect, createCrop);
router.put('/:id', protect, updateCrop);
router.delete('/:id', protect, deleteCrop);

export default router;
