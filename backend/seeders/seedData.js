import mongoose from 'mongoose';
import User from '../models/User.js';
import Crop from '../models/Crop.js';
import Order from '../models/Order.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const sampleUsers = [
  {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91-9876543210',
    password: '$2a$10$hashedpassword123', // This would be hashed in real app
    language: 'hi',
    role: 'farmer',
    isVerified: true,
    location: {
      type: 'Point',
      coordinates: [77.1025, 28.7041], // Delhi coordinates
      address: 'Delhi, India',
      state: 'Delhi',
      district: 'New Delhi',
      pincode: '110001'
    },
    profile: {
      bio: 'Experienced farmer with 15 years in organic farming',
      farmSize: 5,
      crops: ['wheat', 'rice', 'sugarcane'],
      experience: 15
    },
    preferences: {
      notifications: {
        email: true,
        sms: true,
        push: true
      },
      units: 'metric'
    }
  },
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91-9876543211',
    password: '$2a$10$hashedpassword123',
    language: 'hi',
    role: 'farmer',
    isVerified: true,
    location: {
      type: 'Point',
      coordinates: [78.4867, 17.3850], // Hyderabad coordinates
      address: 'Hyderabad, Telangana',
      state: 'Telangana',
      district: 'Hyderabad',
      pincode: '500001'
    },
    profile: {
      bio: 'Specializing in vegetable cultivation',
      farmSize: 3,
      crops: ['tomato', 'onion', 'potato'],
      experience: 8
    },
    preferences: {
      notifications: {
        email: true,
        sms: false,
        push: true
      },
      units: 'metric'
    }
  },
  {
    name: 'Amit Patel',
    email: 'amit.patel@example.com',
    phone: '+91-9876543212',
    password: '$2a$10$hashedpassword123',
    language: 'en',
    role: 'buyer',
    isVerified: true,
    location: {
      type: 'Point',
      coordinates: [72.5714, 23.0225], // Ahmedabad coordinates
      address: 'Ahmedabad, Gujarat',
      state: 'Gujarat',
      district: 'Ahmedabad',
      pincode: '380001'
    },
    preferences: {
      notifications: {
        email: true,
        sms: true,
        push: true
      },
      units: 'metric'
    }
  }
];

const sampleCrops = [
  {
    name: 'Organic Wheat',
    description: 'Premium quality organic wheat grown without pesticides',
    category: 'cereals',
    variety: 'HD-2967',
    quantity: 500,
    unit: 'kg',
    price: 25,
    pricePerUnit: 'kg',
    quality: 'premium',
    harvestDate: new Date('2024-12-01'),
    expiryDate: new Date('2025-06-01'),
    location: {
      type: 'Point',
      coordinates: [77.1025, 28.7041],
      address: 'Delhi, India',
      state: 'Delhi',
      district: 'New Delhi',
      pincode: '110001'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
        caption: 'Fresh wheat harvest'
      }
    ],
    certifications: ['organic', 'pesticide-free'],
    status: 'available',
    isActive: true,
    featured: true
  },
  {
    name: 'Fresh Tomatoes',
    description: 'Juicy red tomatoes perfect for cooking and salads',
    category: 'vegetables',
    variety: 'Hybrid',
    quantity: 200,
    unit: 'kg',
    price: 40,
    pricePerUnit: 'kg',
    quality: 'standard',
    harvestDate: new Date('2024-12-15'),
    expiryDate: new Date('2024-12-30'),
    location: {
      type: 'Point',
      coordinates: [78.4867, 17.3850],
      address: 'Hyderabad, Telangana',
      state: 'Telangana',
      district: 'Hyderabad',
      pincode: '500001'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1546470427-e99e1d7d5e2d?w=400',
        caption: 'Fresh tomatoes'
      }
    ],
    certifications: ['pesticide-free'],
    status: 'available',
    isActive: true
  },
  {
    name: 'Basmati Rice',
    description: 'Aromatic long-grain basmati rice',
    category: 'cereals',
    variety: 'Pusa Basmati',
    quantity: 1000,
    unit: 'kg',
    price: 80,
    pricePerUnit: 'kg',
    quality: 'premium',
    harvestDate: new Date('2024-11-01'),
    expiryDate: new Date('2025-11-01'),
    location: {
      type: 'Point',
      coordinates: [77.1025, 28.7041],
      address: 'Delhi, India',
      state: 'Delhi',
      district: 'New Delhi',
      pincode: '110001'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1586201305766-13b9e01a6793?w=400',
        caption: 'Premium basmati rice'
      }
    ],
    certifications: ['organic'],
    status: 'available',
    isActive: true,
    featured: true
  },
  {
    name: 'Red Onions',
    description: 'Fresh red onions with strong flavor',
    category: 'vegetables',
    variety: 'Red Globe',
    quantity: 300,
    unit: 'kg',
    price: 30,
    pricePerUnit: 'kg',
    quality: 'standard',
    harvestDate: new Date('2024-12-10'),
    expiryDate: new Date('2025-02-10'),
    location: {
      type: 'Point',
      coordinates: [78.4867, 17.3850],
      address: 'Hyderabad, Telangana',
      state: 'Telangana',
      district: 'Hyderabad',
      pincode: '500001'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400',
        caption: 'Fresh red onions'
      }
    ],
    status: 'available',
    isActive: true
  },
  {
    name: 'Sugarcane',
    description: 'Fresh sugarcane ready for juice and processing',
    category: 'cash-crops',
    variety: 'Co-0238',
    quantity: 2000,
    unit: 'kg',
    price: 15,
    pricePerUnit: 'kg',
    quality: 'standard',
    harvestDate: new Date('2024-12-01'),
    expiryDate: new Date('2025-03-01'),
    location: {
      type: 'Point',
      coordinates: [77.1025, 28.7041],
      address: 'Delhi, India',
      state: 'Delhi',
      district: 'New Delhi',
      pincode: '110001'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?w=400',
        caption: 'Fresh sugarcane'
      }
    ],
    status: 'available',
    isActive: true
  }
];

const sampleOrders = [
  {
    buyerId: '', // Will be set after users are created
    sellerId: '', // Will be set after users are created
    cropId: '', // Will be set after crops are created
    quantity: 50,
    totalAmount: 1250,
    status: 'pending'
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Crop.deleteMany({});
    await Order.deleteMany({});

    console.log('🧹 Cleared existing data');

    // Create users
    const createdUsers = await User.create(sampleUsers);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Create crops with farmer references
    const cropsWithFarmers = sampleCrops.map((crop, index) => ({
      ...crop,
      farmer: createdUsers[index % createdUsers.length]._id
    }));

    const createdCrops = await Crop.create(cropsWithFarmers);
    console.log(`✅ Created ${createdCrops.length} crops`);

    // Create orders with proper references
    const ordersWithReferences = sampleOrders.map(order => ({
      ...order,
      buyerId: createdUsers[2]._id, // Amit Patel (buyer)
      sellerId: createdUsers[0]._id, // Rajesh Kumar (farmer)
      cropId: createdCrops[0]._id // Organic Wheat
    }));

    const createdOrders = await Order.create(ordersWithReferences);
    console.log(`✅ Created ${createdOrders.length} orders`);

    console.log('🎉 Database seeded successfully!');
    console.log(`
📊 Summary:
  - Users: ${createdUsers.length}
  - Crops: ${createdCrops.length}
  - Orders: ${createdOrders.length}
    `);

    // Display sample login credentials
    console.log(`
🔑 Sample Login Credentials:
  - Farmer: rajesh.kumar@example.com
  - Buyer: amit.patel@example.com
  - Password: (use any password - authentication is mocked for demo)
    `);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

// Run seeder if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => {
      console.log('✅ Seeding completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    });
}

export default seedDatabase;
