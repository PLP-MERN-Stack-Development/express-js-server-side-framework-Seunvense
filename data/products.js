const { describe } = require("node:test");

// data/products.js
const products = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "Laptop",
    description: "High-performance laptop",
    price: 999.99,
    category: "Electronics",
    inStock: true,
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174001",
    name: "Smartphone",
    description: "Latest model smartphone",
    price: 699.99,
    category: "Electronics",
    inStock: true,
  },
];

module.exports = products;
