// Dependencies and Modules
const express = require('express');

const productController = require('../controllers/product')


// Auth
const auth = require("../auth");

// Object Destructuring
const {verify, verifyAdmin} = auth;


// Routing Component
const router = express.Router()

// Routes
// Route for Creating Product (Admin only)
router.post('/add-product', verify, verifyAdmin, productController.addProduct);

// router.post("/add-product", (req, res) => {
// 	productController.addProduct(req.body).then(resultFromController => res.send(resultFromController))
// })

// Route to retrieve all products
router.get("/getproducts", productController.getAllProducts);

// Route to retrieve all active products
router.get("/getactiveproducts",productController.getActiveProducts)

// Route to retrieve a specific product
router.get("/:productId", productController.getOneProduct)

// Route to change a specific product with a verified admin user only
router.put("/:productId", verify, verifyAdmin, productController.updateProduct)

// Route to archive a product
router.put("/:productId/archive", verify, verifyAdmin, productController.archiveProduct)

// Route to activate a product
router.put("/:productId/activate", verify, verifyAdmin, productController.activateProduct)


// Export Route System
module.exports = router