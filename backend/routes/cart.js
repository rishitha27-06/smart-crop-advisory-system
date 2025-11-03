import express from 'express';
import { optionalAuth } from '../middleware/auth.js';
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart
} from '../controllers/cartController.js';

const router = express.Router();

// Optional authentication - routes work with or without login
router.use(optionalAuth);

router.get('/', getCart);
router.post('/add', addToCart);
router.delete('/:productId', removeFromCart);
router.put('/:productId', updateCartItem);
router.delete('/', clearCart);

export default router;
