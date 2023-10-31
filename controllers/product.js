// Dependencies and Modules
const Product = require("../models/Product");
const bcrypt = require("bcrypt");


// Authentication
const auth = require("../auth")

// Controllers
// Method to add a product with verified admin users only
module.exports.addProduct = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const newProduct = new Product({
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        productPrice: req.body.productPrice
      });

      const product = await newProduct.save();

      if (product) {
        return res.status(201).json({ message: "Product added successfully" });
      } else {
        return res.status(500).json({ message: "Error adding product" });
      }

    }else{ return res.status(403).json({ message: "Action Forbidden" });

    }
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// Retrieve all products
module.exports.getAllProducts = (req, res) => {
  return Product.find({}).then(result =>{
    return res.send(result)
  })
};

// Retrieve all active products
module.exports.getActiveProducts = (req, res) => {

  return Product.find({productIsActive: true}).then(result => {
    return res.send(result);
  })
};

// Retrieve a specific product
module.exports.getOneProduct = (req, res) => {
  return Product.findById(req.params.productId
    ).then(result => {
    return res.send(result);
  })
}

// Updating a product
module.exports.updateProduct = (req, res) => {

  let updatedProduct = {
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productPrice: req.body.productPrice
  }
  return Product.findByIdAndUpdate(req.params.productId, updatedProduct).then((product, error) =>{
    if(error){
      return res.send(false);
    } else {
      return res.send(true);
    }
  })
}

// Archiving a product
module.exports.archiveProduct = (req, res) => {

  let updatedActiveField = {
    productIsActive: false
  }

  return Product.findByIdAndUpdate(req.params.productId, updatedActiveField).then((product, error) => {

    if(error){
      return res.send(false);
    } else {
      return res.send(true);
    }
  });
}

// Activating a Product
module.exports.activateProduct = (req, res) => {

  let updatedActiveField = {
    productIsActive: true
  }

  return Product.findByIdAndUpdate(req.params.productId, updatedActiveField).then((product, error) => {

    if(error){
      return res.send(false);
    } else {
      return res.send(true);
    }
  });
}
