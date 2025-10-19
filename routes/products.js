// routes/products.js
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const products = require("../data/products");
const auth = require("../middleware/auth");
const validateProduct = require("../middleware/validation");
const { NotFoundError, ValidationError } = require("../middleware/error");

router.use(auth);

router.get("/", (req, res) => {
  res.json(products);
});

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

// Test async error
router.get("/test-async-error", async (req, res, next) => {
  try {
    throw new Error("Async error test");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
