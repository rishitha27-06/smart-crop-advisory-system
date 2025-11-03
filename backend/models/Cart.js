import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: String, // Use String type to handle both ObjectId strings and other product identifiers
    required: true
  },
  productType: {
    type: String,
    enum: ['Crop', 'Input', 'Machinery'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
    default: 1
  }
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: String, // Use String type to handle both ObjectId strings and demo user strings
    required: false
  },
  guestId: {
    type: String, // For guest users, use session ID or generated ID
    required: false
  },
  items: [cartItemSchema]
}, {
  timestamps: true
});

// Index for better query performance
cartSchema.index({ userId: 1 });

// Virtual for total items count
cartSchema.virtual('totalItems').get(function() {
  return this.items.reduce((total, item) => total + item.quantity, 0);
});

// Virtual for total price
cartSchema.virtual('totalPrice').get(function() {
  return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
});

export default mongoose.model('Cart', cartSchema);
