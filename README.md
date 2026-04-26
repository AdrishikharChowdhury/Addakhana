# Addakhana

A full-stack real-time chat application built with React, Express, MongoDB, and Socket.IO. Users can sign up, login, update their profile, and chat with others instantly.

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

## Features

- **User Authentication** - Secure sign up and login with JWT-based authentication
- **Profile Management** - Customizable profile with avatar and bio
- **Real-time Messaging** - Instant message delivery via WebSockets
- **Online Status** - See who's online in real-time
- **Message History** - Persistent chat history stored in MongoDB
- **Responsive Design** - Modern UI built with React and Tailwind CSS

## Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | React 19, Vite, Tailwind CSS 4 |
| Backend | Express 5, Socket.IO, JWT |
| Database | MongoDB, Mongoose |
| Storage | Cloudinary |
| Security | bcrypt |

## Getting Started

### Prerequisites

- Node.js 18 or higher
- MongoDB (local or Atlas cluster)
- Cloudinary account (for image storage)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/addakhana.git
cd addakhana
```

2. **Install dependencies**

```bash
# Server dependencies
cd server
npm install

# Client dependencies
cd ../client
npm install
```

3. **Environment Setup**

Create `.env` file in `/server` directory:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_KEY=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Create `.env` file in `/client` directory:
```env
VITE_BACKEND_URL=http://localhost:5000
```

### Running the Application

```bash
# Terminal 1 - Start the server
cd server
npm run server
```

```bash
# Terminal 2 - Start the client
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Author

**Adrishikhar Chowdhury**
- GitHub: [github.com/AdrishikharChowdhury](https://github.com/AdrishikharChowdhury)

## Project Structure

```
addakhana/
├── client/                      # React frontend
│   ├── src/
│   │   ├── components/        # UI components
│   │   ├── context/          # React contexts (Auth, Chat)
│   │   ├── pages/           # Page components
│   │   ├── assets/          # Static assets
│   │   └── lib/            # Utilities
│   └── public/
├── server/                      # Express backend
│   ├── controllers/          # Route handlers
│   ├── lib/                 # Utilities (DB, Cloudinary, Token)
│   ├── middlewares/         # Express middlewares
│   ├── models/              # Mongoose models
│   └── routes/              # API routes
├── README.md
└── LICENSE
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/check` | Verify authentication |
| PUT | `/api/auth/update` | Update user profile |

### Messages
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/messages/:userId` | Get messages between users |
| POST | `/api/messages/send/:userId` | Send a message |
| GET | `/api/messages/users` | Get all users |
| PUT | `/api/messages/mark/:messageId` | Mark message as seen |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.