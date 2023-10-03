require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const app = express();
// app.use(express.static(path.join(__dirname, "img")));
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

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