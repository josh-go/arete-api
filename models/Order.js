// Modules and Dependencies
const mongoose = require('mongoose');

// Schema/Blueprint
const orderSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: [true, "User ID is required."]
	},
	products: [{
		productId: {
			type: String,
			required: [true, "Product ID is required."]
		},
		productQuantity: {
			type: Number,
			required: [true, "Product Quantity is required."]
		}
	}],
	orderTotalAmount: {
		type: Number,
		required: [true, "Total amount of order is required."]
	},
	orderPurchasedOn: {
		type: Date,
		default: new Date()
	}
});

// Model export
module.exports = mongoose.model("Order", orderSchema)