# Smart Kisan Shakti Backend API

A comprehensive backend API for the Smart Kisan Shakti agricultural technology platform, built with Node.js, Express.js, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Complete user registration, login, and profile management
- **Crop Marketplace**: Farmers can list crops for sale with location-based features
- **Order Tracking**: Comprehensive order management with status tracking
- **Real-time Features**: Socket.io integration for live updates
- **Security**: Rate limiting, CORS, input validation, and error handling
- **Scalable Architecture**: Modular structure with controllers, routes, and middleware

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Real-time**: Socket.io
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting
- **File Upload**: Multer

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## 🚀 Installation

1. **Clone the repository and navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/smart-kisan-shakti
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=30d
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | User login | Public |
| GET | `/api/auth/me` | Get current user | Private |
| PUT | `/api/auth/updatedetails` | Update user details | Private |
| PUT | `/api/auth/updatepassword` | Update password | Private |
| POST | `/api/auth/forgotpassword` | Request password reset | Public |
| PUT | `/api/auth/resetpassword/:token` | Reset password | Public |

### Request/Response Examples

#### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123",
  "role": "farmer",
  "language": "hi"
}
```

#### Login User
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

## 🗄️ Database Models

### User Model
- Personal information (name, email, phone)
- Authentication (password, JWT tokens)
- Role-based access (farmer, buyer, admin)
- Language preferences (supports Indian languages)
- Location data with geospatial indexing
- Profile information (farm size, experience, crops)

### Crop Model
- Crop details (name, variety, category)
- Pricing and quantity information
- Location-based features
- Quality certifications
- Farmer relationship
- Status tracking (available, sold, expired)

### Order Model
- Buyer and seller relationships
- Order items with pricing
- Status tracking (pending → delivered)
- Payment information
- Delivery tracking
- Timeline and history

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 🌍 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | development |
| `PORT` | Server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/smart-kisan-shakti |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_EXPIRE` | JWT expiration time | 30d |
| `FRONTEND_URL` | Frontend application URL | http://localhost:5173 |

## 🏗️ Project Structure

```
backend/
├── config/
│   └── database.js          # Database connection
├── controllers/
│   └── authController.js    # Authentication logic
├── middleware/
│   ├── auth.js             # JWT authentication
│   ├── errorHandler.js     # Error handling
│   ├── asyncHandler.js     # Async error wrapper
│   └── notFound.js         # 404 handler
├── models/
│   ├── User.js             # User model
│   ├── Crop.js             # Crop model
│   └── Order.js            # Order model
├── routes/
│   └── auth.js             # Authentication routes
├── utils/                  # Utility functions
├── .env.example           # Environment template
├── package.json           # Dependencies
├── server.js              # Main server file
└── README.md              # This file
```

## 🧪 Testing

Run tests with:
```bash
npm test
```

## 🚀 Deployment

1. **Set environment to production:**
   ```env
   NODE_ENV=production
   ```

2. **Build and start:**
   ```bash
   npm run build
   npm start
   ```

## 📝 Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run build` - Build for production (if applicable)

## 🔒 Security Features

- **Rate Limiting**: Prevents abuse with configurable limits
- **CORS**: Configured for cross-origin requests
- **Helmet**: Security headers
- **Input Validation**: Joi schema validation
- **Password Hashing**: bcrypt for secure passwords
- **JWT Authentication**: Secure token-based auth

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

## 📄 License

This project is licensed under the MIT License.
