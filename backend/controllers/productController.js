// const fs = require("fs");
// const path = require("path");
const Product = require("../models/products");

// Add a new product
const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Could not add the product", details: error.message });
  }
};

// Get all product
const getAllProduct = async (req, res) => {
  try {
    const product = await Product.findAll();
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Could not retrieve products" });
  }
};

// Get a product by ID
const getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Could not retrieve the product" });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.p_name = req.body.p_name;
    product.p_category = req.body.p_category;
    product.p_price = req.body.p_price;
    product.p_conditions = req.body.p_conditions;
    product.p_brand = req.body.p_brand;
    product.p_description = req.body.p_description;
    product.p_receipt = req.body.p_receipt;
    product.p_status = req.body.p_status;
    product.user_id = req.body.user_id;

    await product.save();

    return res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Could not update the product" });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedRowCount = await Product.destroy({ where: { id: productId } });
    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    console.log(`Product ID ${productId} deleted successfully.`);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Could not delete the product" });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
