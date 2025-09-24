import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart
} from '../controllers/cartController.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.get('/', getCart);
router.post('/add', addToCart);
router.delete('/:productId', removeFromCart);
router.put('/:productId', updateCartItem);
router.delete('/', clearCart);

export default router;
