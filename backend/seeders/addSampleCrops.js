import mongoose from 'mongoose';
import Crop from '../models/Crop.js';
import User from '../models/User.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

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

const addSampleCrops = async () => {
  try {
    console.log('🌱 Adding sample crops to database...');

    // Find a user to associate with crops (or create a default one)
    let farmer = await User.findOne({ role: 'farmer' });

    if (!farmer) {
      console.log('No farmer found, creating a default farmer...');
      farmer = await User.create({
        name: 'Default Farmer',
        email: 'farmer@example.com',
        phone: '+91-9999999999',
        password: '$2a$10$hashedpassword123',
        language: 'en',
        role: 'farmer',
        isVerified: true,
        location: {
          type: 'Point',
          coordinates: [77.1025, 28.7041],
          address: 'Delhi, India',
          state: 'Delhi',
          district: 'New Delhi',
          pincode: '110001'
        }
      });
      console.log('✅ Created default farmer');
    }

    // Add farmer reference to crops
    const cropsWithFarmer = sampleCrops.map(crop => ({
      ...crop,
      farmer: farmer._id
    }));

    // Insert crops
    const createdCrops = await Crop.insertMany(cropsWithFarmer);
    console.log(`✅ Added ${createdCrops.length} sample crops to database`);

    console.log('🎉 Sample crops added successfully!');
    console.log(`
📊 Added Crops:
  - ${createdCrops.map(crop => crop.name).join('\n  - ')}
    `);

  } catch (error) {
    console.error('❌ Error adding sample crops:', error);
    throw error;
  }
};

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  addSampleCrops()
    .then(() => {
      console.log('✅ Sample crops added successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Failed to add sample crops:', error);
      process.exit(1);
    });
}

export default addSampleCrops;
