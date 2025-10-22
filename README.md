# Express.js Product API

A RESTful API built with Express.js for managing products, implementing CRUD operations, middleware, error handling, and advanced features.

## Setup Instructions

1. Install Node.js (v18+): https://nodejs.org
2. Clone the repo: `git clone https://github.com/PLP-MERN-Stack-Development/express-js-server-side-framework-Seunvense.git`
3. Navigate to the repo: `cd express-js-server-side-framework-Seunvense`
4. Install dependencies: `npm install`
5. Start the server: `node server.js`
   The server will run at `http://localhost:3000` (or the port specified in `.env`).
6. **Test endpoints**: Use tools like Postman, curl, or a browser to make requests. All `/api/products/*` routes require the header `x-api-key: my-secret-api-key`.

## API Endpoints

All endpoints under `/api/products` require the header `x-api-key: my-secret-api-key`.

| Method | Endpoint                     | Description                                                      |
| ------ | ---------------------------- | ---------------------------------------------------------------- |
| GET    | `/`                          | Returns a welcome message.                                       |
| GET    | `/api/products`              | Lists all products (supports `?category=`, `?page=`, `?limit=`). |
| GET    | `/api/products/:id`          | Gets a product by ID.                                            |
| POST   | `/api/products`              | Creates a new product.                                           |
| PUT    | `/api/products/:id`          | Updates a product by ID.                                         |
| DELETE | `/api/products/:id`          | Deletes a product by ID.                                         |
| GET    | `/api/products/search?name=` | Searches products by name (partial match).                       |
| GET    | `/api/products/stats`        | Returns product counts by category.                              |

## Request/Response Examples

- **GET /api/products?category=electronics**:

curl -H "x-api-key: my-secret-api-key" http://localhost:3000/api/products?category=electronics

POST /api/products:

curl -X POST http://localhost:3000/api/products -H "x-api-key: my-secret-api-key" -H "Content-Type: application/json" -d '{"name":"Tablet","description":"10-inch tablet","price":300,"category":"electronics","inStock":true}'

GET /api/products/search?name=lap:

curl -H "x-api-key: my-secret-api-key" http://localhost:3000/api/products/search?name=lap

GET /api/products/stats:

curl -H "x-api-key: my-secret-api-key" http://localhost:3000/api/products/stats
