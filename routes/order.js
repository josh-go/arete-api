// Dependencies and Modules
const express = require('express');

const orderController = require("../controllers/order")

// Auth
const auth = require("../auth");

// Object Destructuring
const {verify, verifyAdmin} = auth;


// Routing Component
const router = express.Router()

// Routes
// Creating an order checkout for a verified non-Admin User
router.post("/checkout", verify, verifyAdmin, orderController.orderCheckout)



// Export Route System
module.exports = router