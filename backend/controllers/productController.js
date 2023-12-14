const Product = require("../models/products");
const { ErrorHandler } = require("../middlewares/errorHandlers");
const {
  uploadImagesToAzure,
  deleteImagesFromAzure,
} = require("../utils/azureUpload");

const createProduct = async (req, res, next) => {
  console.log("Creating product");
  try {
    let images = Array.isArray(req.files.p_img)
      ? req.files.p_img
      : [req.files.p_img].filter(Boolean);
    let receipts = Array.isArray(req.files.p_receipt)
      ? req.files.p_receipt
      : [req.files.p_receipt].filter(Boolean);
    const imagesLinks = await uploadImagesToAzure(images, "products");
    const receiptLinks = await uploadImagesToAzure(receipts, "receipts");

    req.body.p_img = imagesLinks;
    req.body.p_receipt = receiptLinks;
    req.body.user_id = req.user.id;

    const newProduct = await Product.create(req.body);
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// Get all product
const getAllProduct = async (req, res) => {
  try {
    const { name, price, condition, category, p_status, brand } = req.query;

    const filter = {};

    if (name !== undefined) {
      filter.p_name = { [Op.iLike]: `%${name}%` };
    }

    if (price !== undefined) {
      filter.p_price = { [Op.between]: price.map(Number) };
    }

    if (condition !== undefined) {
      filter.p_conditions = { [Op.between]: condition.map(Number) };
    }

    if (category !== undefined) {
      filter.p_category = {
        [Op.in]: Array.isArray(category) ? category : [category],
      };
    }

    if (p_status !== undefined) {
      filter.p_status = {
        [Op.in]: Array.isArray(p_status) ? p_status : [p_status],
      };
    }

    if (brand !== undefined) {
      filter.p_brand = { [Op.in]: Array.isArray(brand) ? brand : [brand] };
    }

    const products = await Product.findAll({ where: filter });

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Could not retrieve products" });
  }
};

// Get my product
const getMyProducts = async (req, res) => {
  try {
    const product = await Product.findAll({
      where: {
        user_id: req.user.id,
      },
    });
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
const updateProduct = async (req, res, next) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    if (req.files && req.files.p_img) {
      let images = Array.isArray(req.files.p_img)
        ? req.files.p_img
        : [req.files.p_img].filter(Boolean);

      if (product.p_img && product.p_img.length > 0) {
        await Promise.all(
          product.p_img.map(async (image) => {
            try {
              await deleteImagesFromAzure(image.public_id);
            } catch (error) {
              console.error(
                `Error deleting image ${image.public_id}: ${error.message}`
              );
            }
          })
        );
      }

      const imagesLinks = await uploadImagesToAzure(images, "products");
      req.body.p_img = imagesLinks;
    }

    if (req.files && req.files.p_receipt) {
      let receipts = Array.isArray(req.files.p_receipt)
        ? req.files.p_receipt
        : [req.files.p_receipt].filter(Boolean);
      if (product.p_receipt && product.p_receipt.length > 0) {
        await Promise.all(
          product.p_receipt.map(async (receipt) => {
            try {
              await deleteImagesFromAzure(receipt.public_id);
            } catch (error) {
              console.error(
                `Error deleting receipt ${receipt.public_id}: ${error.message}`
              );
            }
          })
        );
      }

      const receiptLinks = await uploadImagesToAzure(receipts, "receipts");
      req.body.p_receipt = receiptLinks;
    }

    req.body.user_id = req.user.id;

    product.set(req.body);
    const productSave = await product.save();

    return res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// Delete a product by ID
const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);
    console.log(product.p_img.length);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    for (let i = 0; i < product.p_img.length; i++) {
      console.log(product.p_img[i]);
      await deleteImagesFromAzure(product.p_img[i].public_id);
    }

    if (product.p_receipt) {
      for (let i = 0; i < product.p_receipt.length; i++) {
        await deleteImagesFromAzure(product.p_receipt[i].public_id);
      }
    }
    const deletedRowCount = await Product.destroy({ where: { id: productId } });
    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    console.log(`Product ID ${productId} deleted successfully.`);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getMyProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
