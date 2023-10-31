// Dependencies and Modules
const Order = require("../models/Order");
const bcrypt = require("bcrypt");
const User = require("../models/User")

// Authentication
const auth = require("../auth")

module.exports.orderCheckout = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      return res.status(403).json({ message: "Action Forbidden" });
    }

    // Find the user's order or create a new one
    let order = await Order.findOne({ userId: req.user.id });

    if (!order) {
      order = new Order({
        userId: req.user.id,
        products: [
          {
            productId: req.body.productId,
            productQuantity: req.body.productQuantity,
          },
        ],
        orderTotalAmount: req.body.orderTotalAmount,
      });
    } else {
      // Add the new order checkout to the existing order
      order.products.push({
        productId: req.body.productId,
        productQuantity: req.body.productQuantity,
      });
      order.orderTotalAmount = req.body.orderTotalAmount;
    }

    // Save the order
    await order.save();

    return res.status(200).json({ message: "Checkout Successful" });
  } catch (error) {
    console.error("Error during checkout:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
