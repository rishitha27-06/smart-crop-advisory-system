import express from 'express';
import { optionalAuth } from '../middleware/auth.js';
import {
  placeOrder,
  getOrders,
  getOrderById
} from '../controllers/orderController.js';

const router = express.Router();

// Optional authentication - routes work with or without login
router.use(optionalAuth);

router.post('/', placeOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);

export default router;
