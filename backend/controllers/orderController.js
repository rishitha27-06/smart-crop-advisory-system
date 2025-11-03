import Cart from '../models/Cart.js';
import Order from '../models/Order.js';

// @desc    Place order from cart
// @route   POST /api/orders
// @access  Public
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    const guestId = req.sessionID || `guest-${Date.now()}`;
    const { shippingAddress, paymentMethod } = req.body;

    const cart = await Cart.findOne({ $or: [{ userId: userId }, { guestId: guestId }] });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Calculate total
    const totalAmount = cart.totalPrice;

    // Generate unique order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // Create order with cart items and additional data from frontend
    const order = await Order.create({
      userId: userId,
      guestId: userId ? null : guestId,
      orderNumber: orderNumber,
      items: cart.items,
      totalAmount,
      status: 'pending',
      shippingAddress: shippingAddress || {},
      paymentMethod: paymentMethod || 'cash_on_delivery',
      paymentStatus: 'pending'
    });

    // Clear cart after successful order
    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order
    });
  } catch (error) {
    console.error('Order placement error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get user's orders
// @route   GET /api/orders
// @access  Public
export const getOrders = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    const guestId = req.sessionID || `guest-${Date.now()}`;

    const orders = await Order.find({ $or: [{ userId: userId }, { guestId: guestId }] }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public
export const getOrderById = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    const guestId = req.sessionID || `guest-${Date.now()}`;

    const order = await Order.findOne({ _id: req.params.id, $or: [{ userId: userId }, { guestId: guestId }] });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};
