// Import Dependencies
const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

// Import Routes
const userRoutes = require("./routes/user");

const productRoutes = require("./routes/product")

const orderRoutes = require("./routes/order")

// Server setup
const app = express();

const port = 4007;

// Middleware
app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(cors());

// // Database Connection 
mongoose.connect("mongodb+srv://joshemmanuelsiogoofficial:IWWz4QoOQHtwC6QQ@cluster0.ty8mxms.mongodb.net/eCommerceAPI", {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

let db = mongoose.connection

db.on("error", console.error.bind(console, "connection error"));

db.once("open", () => console.log("We are connected to the MongoDB Atlas"))

// Backend Routes
app.use("/b7/users" , userRoutes);

app.use("/b7/products" , productRoutes);

app.use("/b7/orders" , orderRoutes)

// Server start

	app.listen(port, () => console.log(`API running at port ${port}`))
