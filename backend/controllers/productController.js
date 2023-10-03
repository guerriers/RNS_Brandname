const Product = require('../models/products');
// Create a new product
const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ error: 'Could not create the product' });
  }
};

// Get all product
const getAllProduct = async (req, res) => {
    try {
        const product = await Product.findAll();
        return res.status(200).json(product);
      } catch (error) {
        console.error(error); // Log the error to the console for debugging
        return res.status(500).json({ error: 'Could not retrieve products' });
      }
  };

// Get a product by ID
const getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: 'Could not retrieve the product' });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const [updatedRowsCount] = await Product.update(req.body, {
      where: { id: productId },
    });
    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Could not update the product' });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedRowCount = await Product.destroy({ where: { id: productId } });
    if (deletedRowCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.status(204).send(); 
  } catch (error) {
    return res.status(500).json({ error: 'Could not delete the product' });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
