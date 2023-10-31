// Dependencies and Modules
const User = require("../models/User");
const bcrypt = require("bcrypt");


// Authentication
const auth = require("../auth")

// User registration controller
	/*
		1.Create a new user object using the following:
			1. Username
			2. Email
			3. Password
			4.Admin Status
		2. Password must be encrypted.
		3. Save the user to the database.
	*/
module.exports.registerUser = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      isAdmin: req.body.isAdmin
    });

    const user = await newUser.save();
    return res.send(true); // User registration succeeded
  } catch (error) {
    console.error('Error registering user:', error);
    return res.send(false); // User registration failed
  }
};


// User Authentication Controller
	/*
		Steps:
			1. Check the database if the user's email exists
			2. Compare the password provided with the password in the database.
			3. Generate an access token if the iser was verified
	*/
	module.exports.loginUser = (req, res) => {
		return User.findOne({email:req.body.email}).then(result => {

			
			if(result == null){

				return false;

			
			} else {

				const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);

				if(isPasswordCorrect) {

					res.send({
						access: auth.createAccessToken(result)

					});
				} else{

					return res.send(false);
				}
			}
		});
	}

// Collect User Details

module.exports.getDetails = (req, res) => {
	return User.findById(req.user.id)
	.lean()
	.then((result) => {
	     // Check if the user was found
		if (!result) {
			return res.status(404).json({ message: "User not found" });
		}

	     // Remove the password field
		result.password = "";

	     // Remove the _id field
		// delete result._id;

		return res.send(result);
	})
	.catch((error) => res.status(500).json({ message: error.message }));
};

// Collect all User Details
module.exports.getAllDetails = (req, res) => {

	// to retrieve all the documents in the "users" collection, we will use the find({}) method
	return User.find({}).then(result =>{
		return res.send(result)
	})
};


// Set user as Admin
module.exports.addAdmin = async (req, res)=> {
  const userId= req.body.userId;

  try {
    // Check if the requesting user is an admin (You need to implement verifyAdmin middleware)
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Only admins can perform this action.' });
    }

    // Find the user by ID and update isAdmin to true
    const updatedUser = await User.findByIdAndUpdate(userId, { isAdmin: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'User updated to admin successfully.', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Strip Admin Privelleges
module.exports.removeAdmin = async (req, res)=> {
  const userId= req.body.userId;

  try {
    // Check if the requesting user is an admin (You need to implement verifyAdmin middleware)
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Only admins can perform this action.' });
    }

    // Find the user by ID and update isAdmin to true
    const updatedUser = await User.findByIdAndUpdate(userId, { isAdmin: false });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'User updated to admin successfully.', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
