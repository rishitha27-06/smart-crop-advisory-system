import mongoose from 'mongoose';
import Crop from './models/Crop.js';
import User from './models/User.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const testAddCrop = async () => {
  try {
    console.log('Testing crop addition...');

    // Find existing farmer or create one
    let farmer = await User.findOne({ role: 'farmer' });
    if (!farmer) {
      console.log('Creating test farmer...');
      farmer = await User.create({
        name: 'Test Farmer',
        email: 'test@example.com',
        phone: '+91-9999999999',
        password: 'hashedpassword123',
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
      console.log('✅ Created test farmer');
    }

    // Add a test crop
    const testCrop = {
      name: 'Test Wheat',
      description: 'Test crop for debugging',
      category: 'cereals',
      variety: 'Test Variety',
      quantity: 100,
      unit: 'kg',
      price: 25,
      pricePerUnit: 'kg',
      quality: 'standard',
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
          url: 'https://example.com/test.jpg',
          caption: 'Test crop'
        }
      ],
      certifications: ['organic'],
      status: 'available',
      isActive: true,
      featured: false,
      farmer: farmer._id
    };

    const createdCrop = await Crop.create(testCrop);
    console.log('✅ Created test crop:', createdCrop.name);

    // Check total crops
    const totalCrops = await Crop.countDocuments();
    console.log(`📊 Total crops in database: ${totalCrops}`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    process.exit(0);
  }
};

testAddCrop();
