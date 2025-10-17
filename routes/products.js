// routes/products.js
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const products = require("../data/products");

// GET /api/products - List all products
router.get("/", (req, res) => {
  res.json(products);
});

// GET /api/products/:id - Get a specific product
router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

// POST /api/products - Create a new product
router.post("/", (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || !price || !category || inStock === undefined) {
    return res.status(400).json({ message: "All fields are required" });
  }
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

// PUT /api/products/:id - Update a product
router.put("/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || !price || !category || inStock === undefined) {
    return res.status(400).json({ message: "All fields are required" });
  }
  product.name = name;
  product.description = description;
  product.price = Number(price);
  product.category = category;
  product.inStock = Boolean(inStock);
  res.json(product);
});

// DELETE /api/products/:id - Delete a product
router.delete("/:id", (req, res) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  const deletedProduct = products.splice(index, 1)[0];
  res.json(deletedProduct);
});

module.exports = router;
