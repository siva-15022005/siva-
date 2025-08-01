# Halleyx Coding Challenge - Full-Stack E-commerce Application

A comprehensive full-stack e-commerce application with separate customer and admin portals, built with React (TypeScript), Node.js, Express, and MongoDB.

## 🚀 Features

### Customer Portal
- **Authentication**: Registration, login with JWT-based authentication
- **Product Browsing**: Paginated product catalog with search and filtering
- **Shopping Cart**: Add/remove items, quantity management
- **Order Management**: Place orders, view order history, track status
- **Profile Management**: Update personal information and password

### Admin Portal
- **Authentication**: Secure admin login with seeded credentials
- **Dashboard**: Summary statistics (products, customers, orders)
- **Product Management**: Full CRUD operations with image uploads
- **Customer Management**: View, edit, block/unblock customers
- **Order Management**: View, update status, manage all orders
- **Customer Impersonation**: Admin can impersonate customers for support
- **Branding Settings**: Customize customer portal appearance

### Technical Features
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Separate permissions for customers and admins
- **File Uploads**: Product images and branding logos
- **Responsive Design**: Modern UI with Tailwind CSS
- **Data Validation**: Comprehensive input validation on frontend and backend
- **Error Handling**: Graceful error handling and user feedback
- **Security**: Helmet, CORS, rate limiting, input sanitization

## 🛠 Tech Stack

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Multer** for file uploads
- **Express Validator** for input validation
- **Helmet** for security headers
- **CORS** for cross-origin requests
- **Morgan** for logging

### Frontend
- **React 18** with **TypeScript**
- **React Router** for navigation
- **React Hook Form** with **Yup** validation
- **Axios** for HTTP requests
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Hot Toast** for notifications

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd halleyx-coding-challenge
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `server` directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/halleyx_challenge
JWT_SECRET=your_super_secret_jwt_key_change_in_production_12345
JWT_EXPIRE=7d
BCRYPT_ROUNDS=12
```

For MongoDB Atlas (cloud database), replace `MONGODB_URI` with your connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/halleyx_challenge?retryWrites=true&w=majority
```

### 4. Seed the Database
```bash
cd server
npm run seed
```

This creates:
- **Admin user**: `admin@example.com` / `admin123`
- **Sample customers**: `alice.smith@example.com` / `password123` (and others)
- **20 sample products** with various categories and stock levels

### 5. Start the Application

#### Development Mode (recommended)
```bash
# From the root directory
npm run dev
```
This starts both the backend server (port 5000) and React development server (port 3000) concurrently.

#### Production Mode
```bash
# Build the React app
cd client
npm run build

# Start the production server
cd ../server
npm start
```

## 🎯 Usage

### Customer Portal (http://localhost:3000)
1. **Register/Login**: Create a new account or use existing credentials
2. **Browse Products**: View paginated product catalog, search by name
3. **Shopping**: Add items to cart, proceed to checkout
4. **Orders**: View order history and track status
5. **Profile**: Update personal information and password

### Admin Portal (http://localhost:3000/admin)
1. **Login**: Use `admin@example.com` / `admin123`
2. **Dashboard**: View business metrics and statistics
3. **Products**: Add, edit, delete products with image uploads
4. **Customers**: Manage customer accounts, block/unblock users
5. **Orders**: Update order status, view detailed order information
6. **Impersonation**: Click "Impersonate" next to any customer to view their perspective
7. **Settings**: Customize customer portal branding (colors, fonts, logo)

## 🔐 Default Credentials

### Admin
- **Email**: `admin@example.com`
- **Password**: `admin123`

### Sample Customers
- **Email**: `alice.smith@example.com`
- **Password**: `password123`

Additional customers are available with similar credentials (check the seed script).

## 📁 Project Structure

```
halleyx-coding-challenge/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context (auth, cart, etc.)
│   │   ├── pages/          # Page components
│   │   │   ├── admin/      # Admin portal pages
│   │   │   └── customer/   # Customer portal pages
│   │   ├── types/          # TypeScript type definitions
│   │   ├── utils/          # API client and utilities
│   │   └── App.tsx         # Main app component
│   ├── package.json
│   └── tailwind.config.js
├── server/                 # Node.js backend
│   ├── config/             # Database configuration
│   ├── middleware/         # Express middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── scripts/            # Database seeding scripts
│   ├── utils/              # Backend utilities
│   ├── uploads/            # File upload directory
│   ├── .env               # Environment variables
│   ├── package.json
│   └── server.js          # Express server
├── package.json           # Root package.json
└── README.md
```

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register` - Customer registration
- `POST /api/auth/login` - Customer login
- `POST /api/auth/admin/login` - Admin login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Products
- `GET /api/products` - Get products (with pagination, search, filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders
- `GET /api/orders` - Get orders (filtered by user role)
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order (admin only)
- `DELETE /api/orders/:id` - Delete order (admin only)

### Users
- `GET /api/users/customers` - Get customers (admin only)
- `GET /api/users/customers/:id` - Get customer details (admin only)
- `PUT /api/users/customers/:id` - Update customer (admin only)
- `DELETE /api/users/customers/:id` - Delete customer (admin only)
- `PUT /api/users/profile` - Update own profile
- `PUT /api/users/password` - Change password

### Settings
- `GET /api/settings/branding` - Get branding settings
- `PUT /api/settings/branding` - Update branding (admin only)

## 🎨 Customization

### Branding
Admins can customize the customer portal appearance:
- **Primary Color**: Main brand color for buttons and links
- **Secondary Color**: Accent color for secondary elements
- **Font Family**: Choose from web-safe fonts
- **Logo**: Upload custom logo (appears in customer portal)
- **Custom HTML**: Add custom content to customer dashboard

### Admin Impersonation
Admins can impersonate customers to:
- View the portal from customer perspective
- Place orders on behalf of customers
- Troubleshoot customer issues
- Test customer experience

## 🚀 Deployment

### Backend Deployment (Heroku)
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Connect to GitHub repository
4. Deploy the `server` directory

### Frontend Deployment (Netlify/Vercel)
1. Build the React app: `cd client && npm run build`
2. Deploy the `client/build` directory
3. Set `REACT_APP_API_URL` environment variable to your backend URL

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas cluster
2. Get the connection string
3. Update `MONGODB_URI` in your environment variables

## 🔧 Development

### Running Tests
```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

### Code Formatting
```bash
# Install Prettier (optional)
npm install -g prettier

# Format code
prettier --write "**/*.{js,jsx,ts,tsx,json,css,md}"
```

### Environment Variables
Create appropriate `.env` files for different environments:
- `.env.development`
- `.env.production`
- `.env.test`

## 📝 License

This project is part of the Halleyx coding challenge and is for demonstration purposes.

## 🤝 Contributing

This is a coding challenge project. For evaluation purposes, please refer to the implementation requirements and feature checklist.

## 📞 Support

For questions about this implementation, please review the code comments and documentation. The application includes comprehensive error handling and user feedback systems.