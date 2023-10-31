// Modules and Dependencies
const mongoose = require('mongoose');

// Schema/Blueprint
const productSchema = new mongoose.Schema({
	productName: {
		type: String,
		required: [true, "Product Name is required."]
	},
	productDescription: {
		type: String,
		required: [true, "Product Description is required."]
	},
	productPrice: {
		type: Number,
		required: [true, "Product Price is required."]
	},
	productIsActive: {
		type: Boolean,
		default: true
	},
	productCreatedOn: {
		type: Date,
		default: new Date()
	}
});

// Model export
module.exports = mongoose.model("Product", productSchema)