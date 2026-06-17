## MERN Auth System 🔐

This project demonstrates a complete authentication workflow, including user registration, login, protected dashboard access, JWT cookie handling, and password updates for authenticated users.

### ✨ Core Features

- ✅ User registration with email and password
- 🔒 Secure login using JSON Web Tokens stored in HTTP-only cookies
- 🛡️ Protected dashboard route accessible only to authenticated users
- 🔄 Change password flow for signed-in users
- 👁️ Password visibility toggle on sensitive forms
- 👤 Profile dropdown with logout and change password actions
- 🎨 Clean UI built with React, Tailwind CSS, and responsive layout patterns

### 📦 Technology Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Auth:** JWT, bcrypt, secure cookies
- **Frontend:** React, Vite, Tailwind CSS, React Router
- **API Client:** Axios

### 📁 Repository Structure

```text
Auth-system/
├─ backend/
│  ├─ .env.example
│  ├─ package.json
│  ├─ server.js
│  ├─ config/
│  │  └─ db.js
│  ├─ controllers/
│  │  └─ authController.js
│  ├─ routes/
│  │  └─ authRoutes.js
│  ├─ middleware/
│  │  └─ authMiddleware.js
│  ├─ models/
│  │  └─ User.js
│  └─ utils/
│     └─ generateToken.js

├─ frontend/
│  ├─ package.json
│  ├─ index.html
│  ├─ vite.config.js
│  ├─ postcss.config.js
│  ├─ tailwind.config.js
│  └─ src/
│     ├─ main.jsx
│     ├─ index.css
│     ├─ App.jsx
│     ├─ services/
│     │  └─ api.js
│     ├─ pages/
│     │  ├─ Login.jsx
│     │  ├─ Register.jsx
│     │  ├─ Dashboard.jsx
│     │  └─ ChangePassword.jsx
│     └─ components/
│        ├─ Common/
│        │  ├─ Navbar.jsx
│        │  ├─ Input.jsx
│        │  └─ Button.jsx
│        └─ ProtectedRoute.jsx
```

### ✅ Prerequisites

- Node.js v18 or newer
- npm
- MongoDB connection string

### 🚀 Setup

1. **Clone the repository:**

```bash
git clone <repository-url>
cd Auth-system
```

2. **Install backend dependencies:**

```bash
cd backend
npm install
```

3. **Install frontend dependencies:**

```bash
cd ../frontend
npm install
```

4. **Set up environment variables:**

   - Copy the `.env.example` template in the `backend/` directory to create your `.env` file:
     ```bash
     cp backend/.env.example backend/.env
     ```
   - Open the new `.env` file and update the variables with your configuration:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secure_jwt_secret
     CLIENT_URL=http://localhost:5173
     PORT=5000
     NODE_ENV=development
     ```

### ⚙️ Running the Application

**Start the backend server:**

```bash
cd backend
npm run dev
```

**Start the frontend development server:**

```bash
cd frontend
npm run dev
```

Open `http://localhost:5173` in your browser.

### 🔐 Authentication Flow

1. Create an account via the registration page
2. Authenticate with email and password
3. The server issues a JWT and stores it in an HTTP-only cookie
4. Protected routes verify the cookie before granting access
5. Authenticated users can change their password from the dashboard

### 🔑 Environment Variables

The backend relies on the following variables:

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key used to sign JWTs
- `CLIENT_URL` - Frontend origin for CORS
- `PORT` - Backend server port
- `NODE_ENV` - Application environment mode

> Keep `.env` files out of version control and never commit secrets.

### 📝 Notes

- The backend requires `JWT_SECRET` and does not fall back to a hardcoded secret.
- Cookies are configured for secure token storage.
- Run the frontend and backend independently during development.

### 💡 Recommended Enhancements

- Add email verification during registration
- Add password strength validation rules
- Implement refresh tokens for session management
- Harden production cookie settings and CORS policies

### 📄 License

This project is provided for learning and demonstration purposes.
