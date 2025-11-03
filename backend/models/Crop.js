import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add crop name'],
    trim: true,
    maxlength: [100, 'Crop name cannot be more than 100 characters']
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Please add crop category'],
    enum: [
      'cereals', 'pulses', 'oilseeds', 'vegetables', 'fruits',
      'spices', 'cash-crops', 'others'
    ]
  },
  variety: {
    type: String,
    required: [true, 'Please add crop variety'],
    trim: true
  },
  farmer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Crop must belong to a farmer']
  },
  quantity: {
    type: Number,
    required: [true, 'Please add quantity'],
    min: [0, 'Quantity cannot be negative']
  },
  unit: {
    type: String,
    required: [true, 'Please add unit'],
    enum: ['kg', 'quintal', 'ton', 'bunch', 'piece'],
    default: 'kg'
  },
  price: {
    type: Number,
    required: [true, 'Please add price'],
    min: [0, 'Price cannot be negative']
  },
  pricePerUnit: {
    type: String,
    enum: ['kg', 'quintal', 'ton'],
    default: 'kg'
  },
  quality: {
    type: String,
    enum: ['premium', 'standard', 'basic'],
    default: 'standard'
  },
  harvestDate: {
    type: Date,
    required: [true, 'Please add harvest date']
  },
  expiryDate: {
    type: Date,
    validate: {
      validator: function(value) {
        return value > this.harvestDate;
      },
      message: 'Expiry date must be after harvest date'
    }
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function(value) {
          return value.length === 2 &&
                 value[0] >= -180 && value[0] <= 180 &&
                 value[1] >= -90 && value[1] <= 90;
        },
        message: 'Invalid coordinates'
      }
    },
    address: String,
    state: String,
    district: String,
    pincode: String
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    public_id: String,
    caption: String
  }],
  certifications: [{
    type: String,
    enum: ['organic', 'gmo-free', 'pesticide-free', 'fair-trade']
  }],
  status: {
    type: String,
    enum: ['available', 'sold', 'reserved', 'expired', 'withdrawn'],
    default: 'available'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  inquiries: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
cropSchema.index({ farmer: 1, status: 1 });
cropSchema.index({ category: 1, status: 1 });
cropSchema.index({ location: '2dsphere' });
cropSchema.index({ price: 1 });
cropSchema.index({ createdAt: -1 });
cropSchema.index({ featured: -1, createdAt: -1 });

// Virtual for days since harvest
cropSchema.virtual('daysSinceHarvest').get(function() {
  return Math.floor((Date.now() - this.harvestDate) / (1000 * 60 * 60 * 24));
});

// Virtual for price per kg (normalized)
cropSchema.virtual('pricePerKg').get(function() {
  const conversion = {
    'kg': 1,
    'quintal': 100,
    'ton': 1000
  };
  return this.price / (this.quantity * conversion[this.pricePerUnit] / conversion[this.unit]);
});

// Virtual for distance from a point (requires coordinates)
cropSchema.virtual('distance').get(function() {
  if (!this.location || !this.location.coordinates) return null;
  // This will be populated when querying with near
  return this._distance;
});

// Static method to find crops near a location
cropSchema.statics.findNearby = function(coordinates, maxDistance = 10000) {
  return this.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: coordinates
        },
        $maxDistance: maxDistance
      }
    },
    status: 'available'
  });
};

// Pre-save middleware to update expiry status
cropSchema.pre('save', function(next) {
  if (this.expiryDate && this.expiryDate < new Date() && this.status === 'available') {
    this.status = 'expired';
  }
  next();
});

// Instance method to check if crop is still fresh
cropSchema.methods.isFresh = function() {
  const daysSinceHarvest = this.daysSinceHarvest;
  const freshThreshold = {
    'vegetables': 7,
    'fruits': 14,
    'cereals': 365,
    'pulses': 365,
    'oilseeds': 365,
    'spices': 365
  };
  return daysSinceHarvest <= (freshThreshold[this.category] || 30);
};

export default mongoose.model('Crop', cropSchema);
