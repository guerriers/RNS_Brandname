require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userVerifyRoutes = require('./routes/userVerifyRoutes');
const app = express();
const cookieParser = require("cookie-parser");

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/userVerify', userVerifyRoutes);

const PORT = process.env.PORT || 3001;
// db.sync({ force: true })
db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });