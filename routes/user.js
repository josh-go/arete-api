// Dependencies and Modules
const express = require('express');

const userController = require("../controllers/user")

// Auth
const auth = require("../auth");

// Object Destructuring
const {verify, verifyAdmin} = auth;


// Routing Component
const router = express.Router()

// Routes
// Route for User Registration
router.post("/register", userController.registerUser)

// Route for User Authorization
router.post("/login", userController.loginUser)

// Route for User Details 
router.get("/details", verify, userController.getDetails)

// Route for Collecting all users 
router.get("/details/all", verify, verifyAdmin, userController.getAllDetails)

// Route for adding administrators
router.put("/admin/user:id/add", verify, verifyAdmin, userController.addAdmin)

// Route for removing administrators
router.put("/admin/user:id/remove", verify, verifyAdmin, userController.removeAdmin)

// Export Route System
module.exports = router