import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  placeOrder,
  getOrders,
  getOrderById
} from '../controllers/orderController.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.post('/', placeOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);

export default router;
