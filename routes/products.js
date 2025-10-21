// routes/products.js
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const products = require("../data/products");
const auth = require("../middleware/auth");
const validateProduct = require("../middleware/validation");
const { NotFoundError, ValidationError } = require("../middleware/error");

router.use(auth);

// ✅ GET all or filter by category
router.get("/", (req, res) => {
  const { category, page = 1, limit = 2 } = req.query;
  let filteredProducts = products;
  if (category) {
    filteredProducts = products.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  res.json({
    page: Number(page),
    limit: Number(limit),
    total: filteredProducts.length,
    products: paginatedProducts,
  });
});

// ✅ GET single product by ID
router.get("/:id", (req, res, next) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return next(new NotFoundError("Product not found"));
  }
  res.json(product);
});

router.post("/", validateProduct, (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price: Number(price),
    category,
    inStock: Boolean(inStock),
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

router.put("/:id", validateProduct, (req, res, next) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return next(new NotFoundError("Product not found"));
  }
  const { name, description, price, category, inStock } = req.body;
  product.name = name;
  product.description = description;
  product.price = Number(price);
  product.category = category;
  product.inStock = Boolean(inStock);
  res.json(product);
});

router.delete("/:id", (req, res, next) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return next(new NotFoundError("Product not found"));
  }
  const deletedProduct = products.splice(index, 1)[0];
  res.json(deletedProduct);
});

module.exports = router;
