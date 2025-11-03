import Cart from '../models/Cart.js';
import mongoose from 'mongoose';
import { asyncHandler } from '../middleware/asyncHandler.js';

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Public
export const getCart = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    const guestId = req.sessionID || `guest-${Date.now()}`;

    let cart = await Cart.findOne({ $or: [{ userId: userId }, { guestId: guestId }] });

    if (!cart) {
      cart = await Cart.create({
        userId: userId,
        guestId: userId ? null : guestId,
        items: []
      });
    }

    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Public
export const addToCart = async (req, res) => {
  try {
    const { productId, productType, name, price, image, quantity = 1 } = req.body;
    const userId = req.user ? req.user.id : null;
    const guestId = req.sessionID || `guest-${Date.now()}`;

    let cart = await Cart.findOne({ $or: [{ userId: userId }, { guestId: guestId }] });

    if (!cart) {
      cart = await Cart.create({
        userId: userId,
        guestId: userId ? null : guestId,
        items: []
      });
    }

    // Check if item already exists in cart
    const existingItem = cart.items.find(item => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId: productId,
        productType,
        name,
        price: Number(price),
        image,
        quantity: Number(quantity)
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Product added to cart',
      data: cart
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Public
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user ? req.user.id : null;
    const guestId = req.sessionID || `guest-${Date.now()}`;

    const cart = await Cart.findOne({ $or: [{ userId: userId }, { guestId: guestId }] });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items = cart.items.filter(item => item.productId !== productId);

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Product removed from cart',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update item quantity in cart
// @route   PUT /api/cart/:productId
// @access  Public
export const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user ? req.user.id : null;
    const guestId = req.sessionID || `guest-${Date.now()}`;

    const cart = await Cart.findOne({ $or: [{ userId: userId }, { guestId: guestId }] });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const item = cart.items.find(item => item.productId === productId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    item.quantity = quantity;

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart updated',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Public
export const clearCart = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    const guestId = req.sessionID || `guest-${Date.now()}`;

    const cart = await Cart.findOne({ $or: [{ userId: userId }, { guestId: guestId }] });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart cleared',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};
