const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/smart-kisan-shakti';
const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 10000,
});

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
    featured: true,
    farmer: null, // Will be set after creating farmer
    createdAt: new Date(),
    updatedAt: new Date()
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
    isActive: true,
    featured: false,
    farmer: null,
    createdAt: new Date(),
    updatedAt: new Date()
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
    featured: true,
    farmer: null,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Connecting to MongoDB directly...');
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db('smart-kisan-shakti');

    // Check if we already have crops
    const existingCrops = await db.collection('crops').countDocuments();
    console.log(`📊 Existing crops: ${existingCrops}`);

    if (existingCrops > 1) {
      console.log('✅ Database already has crops, skipping seeding');
      return;
    }

    // Create a sample farmer first
    const sampleFarmer = {
      name: 'Demo Farmer',
      email: 'farmer@demo.com',
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
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const farmerResult = await db.collection('users').insertOne(sampleFarmer);
    console.log('✅ Created sample farmer');

    // Add farmer reference to crops
    const cropsWithFarmer = sampleCrops.map(crop => ({
      ...crop,
      farmer: farmerResult.insertedId
    }));

    // Insert crops
    const cropResult = await db.collection('crops').insertMany(cropsWithFarmer);
    console.log(`✅ Inserted ${cropResult.insertedCount} crops`);

    console.log('🎉 Database seeded successfully with MongoDB driver!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await client.close();
    console.log('🔌 Database connection closed');
  }
}

seedDatabase();
