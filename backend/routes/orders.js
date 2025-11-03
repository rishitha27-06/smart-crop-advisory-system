import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus
} from '../controllers/orderController.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.get('/', getOrders);
router.get('/:id', getOrder);
router.post('/', createOrder);
router.patch('/:id/status', updateOrderStatus);

export default router;
