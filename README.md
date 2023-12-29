# RNS Brandname Project 👜💍

Hi there! 👋 Welcome to the RNS Brandname project. Visit [rnsbrandname.vercel.app](https://rnsbrandname.vercel.app/) to explore the platform. This repository contains both the frontend and backend components. Follow the instructions below to get started.

# Features ✏️

- **Centralized Platform:** Connects buyers and sellers seamlessly.
- **Rental Services:** Experience luxury without purchasing.
- **Diverse Brands:** From high-end luxury to popular high-street names.

# Getting Started 🚀

- **Clone the project.**
- **Set up frontend and backend.**
- **Configure environment variables.**

## Clone the Project 📌

Cloning the Project

```bash
git clone https://github.com/guerriers/RNS_Brandname.git
```

## Frontend Setup 📌

### Installation

Navigate to the `frontend` folder:

```bash
cd frontend
```

Install dependencies using either npm or yarn:

```
npm install
```

or

```
yarn install
```

### Run the development server

To run the frontend locally, open the development server with the following command:

```
npm run start
```

or

```
yarn start
```

### Compiling and Minifying for Production

For production, you can compile and minify the frontend code using:

```
npm run build
```

or

```
yarn build
```

## Backend Setup 📌

### Installation

Navigate to the `backend` folder:

```bash
cd backend
```

Install backend dependencies using either npm or yarn:

```
npm install
```

or

```
yarn install
```

### Running Locally

Start the backend with hot reloading:

```
npm run dev
```

or

```
yarn dev
```

## Configure environment variables 📌

### Backend Configuration

- In the `backend` folder, create a `.env` file if it doesn't exist. Fill in the following variables:

```
# Backend Configuration
PORT=3001
NODE_ENV=DEVELOPMENT
FRONTEND_URL=http://localhost:3000
POSTGRES_URL=your_postgres_uri

# JWT Configuration
JWT_SECRET=your_jwt_secret
COOKIE_EXPIRES_TIME=set_your_jwt
JWT_EXPIRES_TIME=set_your_jwt

# SMTP Configuration
SMTP_HOST=your_host
SMTP_PORT=your_port
SMTP_EMAIL=your_email
SMTP_PASSWORD=your_password
SMTP_FROM_EMAIL=your_from_email
SMTP_FROM_NAME=your_from_name

# Azure Storage Configuration
AZURE_STORAGE_CONNECTION_STRING=your_azure_storage
```

### Frontend Configuration

- In the `frontend` folder, create a `.env.local` file if it doesn't exist. Fill in the following variables:

```bash
REACT_APP_BASE_URL=http://localhost:3001
REACT_APP_FRONTEND_URL=http://localhost:3000
SKIP_PREFLIGHT_CHECK=true
```

Ensure these configurations match your setup to establish the necessary connections between the frontend and backend.

---

Next, open [http://localhost:3000](http://localhost:3000) in your browser to see the result. 😄💕

Feel free to explore and contribute to the RNS Brandname project! If you have any questions or issues, don't hesitate to reach out. Happy coding!! 🚀🚀
