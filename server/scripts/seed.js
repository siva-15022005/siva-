require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const Settings = require('../models/Settings');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    
    if (!existingAdmin) {
      const admin = await User.create({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('✅ Admin user created:', admin.email);
    } else {
      console.log('ℹ️  Admin user already exists');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

const seedProducts = async () => {
  try {
    // Check if products already exist
    const existingProducts = await Product.countDocuments();
    
    if (existingProducts === 0) {
      const sampleProducts = [
        {
          name: 'Wireless Bluetooth Headphones',
          description: 'High-quality wireless headphones with noise cancellation and long battery life. Perfect for music lovers and professionals.',
          price: 99.99,
          stockQuantity: 50
        },
        {
          name: 'Smart Watch Series 5',
          description: 'Advanced smartwatch with fitness tracking, heart rate monitor, GPS, and water resistance. Compatible with iOS and Android.',
          price: 249.99,
          stockQuantity: 30
        },
        {
          name: 'Portable Power Bank 20000mAh',
          description: 'High-capacity portable charger with fast charging technology. Multiple USB ports for charging multiple devices simultaneously.',
          price: 39.99,
          stockQuantity: 75
        },
        {
          name: 'Wireless Gaming Mouse',
          description: 'Precision gaming mouse with customizable DPI, RGB lighting, and ergonomic design. Perfect for competitive gaming.',
          price: 79.99,
          stockQuantity: 25
        },
        {
          name: 'USB-C Laptop Charger 65W',
          description: 'Universal USB-C charger compatible with most laptops. Compact design with fast charging capabilities.',
          price: 49.99,
          stockQuantity: 40
        },
        {
          name: 'Wireless Charging Pad',
          description: 'Fast wireless charging pad compatible with Qi-enabled devices. Sleek design with LED indicator.',
          price: 29.99,
          stockQuantity: 60
        },
        {
          name: '4K Webcam for Streaming',
          description: 'Professional 4K webcam with auto-focus and noise-reducing microphone. Ideal for streaming and video conferencing.',
          price: 129.99,
          stockQuantity: 20
        },
        {
          name: 'Bluetooth Mechanical Keyboard',
          description: 'Compact mechanical keyboard with blue switches, backlit keys, and wireless connectivity.',
          price: 89.99,
          stockQuantity: 35
        },
        {
          name: 'Portable SSD 1TB',
          description: 'Ultra-fast portable SSD with USB 3.2 connection. Lightweight and durable for data storage on the go.',
          price: 149.99,
          stockQuantity: 15
        },
        {
          name: 'Noise Cancelling Earbuds',
          description: 'True wireless earbuds with active noise cancellation and premium sound quality. Includes charging case.',
          price: 179.99,
          stockQuantity: 45
        },
        {
          name: 'Adjustable Phone Stand',
          description: 'Foldable and adjustable phone stand compatible with all smartphone sizes. Perfect for video calls and media viewing.',
          price: 19.99,
          stockQuantity: 100
        },
        {
          name: 'LED Ring Light 18 inch',
          description: 'Professional LED ring light with adjustable brightness and color temperature. Includes phone holder and tripod.',
          price: 89.99,
          stockQuantity: 25
        },
        {
          name: 'Wireless Car Charger Mount',
          description: 'Automatic wireless car charger with phone mount. One-handed operation with fast charging capability.',
          price: 59.99,
          stockQuantity: 30
        },
        {
          name: 'Gaming Chair Ergonomic',
          description: 'Professional gaming chair with lumbar support, adjustable height, and reclining feature. Premium materials and comfort.',
          price: 299.99,
          stockQuantity: 10
        },
        {
          name: 'Desktop Monitor 27 inch 4K',
          description: 'Ultra HD 4K monitor with IPS panel, HDR support, and multiple connectivity options. Perfect for work and gaming.',
          price: 399.99,
          stockQuantity: 12
        },
        {
          name: 'Wireless Router WiFi 6',
          description: 'High-speed WiFi 6 router with advanced security features and extended range. Supports up to 100 devices.',
          price: 159.99,
          stockQuantity: 20
        },
        {
          name: 'Bluetooth Speaker Waterproof',
          description: 'Portable waterproof Bluetooth speaker with 360-degree sound and long battery life. Perfect for outdoor activities.',
          price: 69.99,
          stockQuantity: 55
        },
        {
          name: 'Laptop Cooling Pad',
          description: 'Adjustable laptop cooling pad with multiple fans and USB ports. Helps prevent overheating and improves performance.',
          price: 34.99,
          stockQuantity: 40
        },
        {
          name: 'Cable Management Kit',
          description: 'Complete cable management solution with cord organizers, cable ties, and desk grommets. Keep your workspace tidy.',
          price: 24.99,
          stockQuantity: 80
        },
        {
          name: 'Digital Drawing Tablet',
          description: 'Professional drawing tablet with pressure-sensitive stylus and customizable shortcut keys. Perfect for digital artists.',
          price: 199.99,
          stockQuantity: 18
        }
      ];

      await Product.insertMany(sampleProducts);
      console.log(`✅ ${sampleProducts.length} sample products created`);
    } else {
      console.log('ℹ️  Products already exist in database');
    }
  } catch (error) {
    console.error('Error creating sample products:', error);
  }
};

const seedCustomers = async () => {
  try {
    // Check if customers already exist
    const existingCustomers = await User.countDocuments({ role: 'customer' });
    
    if (existingCustomers === 0) {
      const sampleCustomers = [
        {
          firstName: 'Alice',
          lastName: 'Smith',
          email: 'alice.smith@example.com',
          password: 'password123',
          role: 'customer'
        },
        {
          firstName: 'Bob',
          lastName: 'Johnson',
          email: 'bob.johnson@example.com',
          password: 'password123',
          role: 'customer'
        },
        {
          firstName: 'Carol',
          lastName: 'Williams',
          email: 'carol.williams@example.com',
          password: 'password123',
          role: 'customer'
        },
        {
          firstName: 'David',
          lastName: 'Brown',
          email: 'david.brown@example.com',
          password: 'password123',
          role: 'customer'
        },
        {
          firstName: 'Emma',
          lastName: 'Davis',
          email: 'emma.davis@example.com',
          password: 'password123',
          role: 'customer'
        }
      ];

      await User.insertMany(sampleCustomers);
      console.log(`✅ ${sampleCustomers.length} sample customers created`);
    } else {
      console.log('ℹ️  Customers already exist in database');
    }
  } catch (error) {
    console.error('Error creating sample customers:', error);
  }
};

const seedSettings = async () => {
  try {
    // Create default settings if they don't exist
    const settings = await Settings.getSettings();
    console.log('✅ Default settings initialized');
  } catch (error) {
    console.error('Error initializing settings:', error);
  }
};

const runSeed = async () => {
  console.log('🌱 Starting database seeding...');
  
  await connectDB();
  
  await seedAdmin();
  await seedProducts();
  await seedCustomers();
  await seedSettings();
  
  console.log('🎉 Database seeding completed!');
  console.log('\n📝 Use these credentials to test the application:');
  console.log('Admin Login:');
  console.log('  Email: admin@example.com');
  console.log('  Password: admin123');
  console.log('\nCustomer Login (example):');
  console.log('  Email: alice.smith@example.com');
  console.log('  Password: password123');
  
  process.exit(0);
};

// Handle errors
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

runSeed();