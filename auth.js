// Dependencies
const jwt = require("jsonwebtoken")

// Secret
const secret = "eCommerceAPI"

// Token Creation Function
module.exports.createAccessToken = (user) => {
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}; 
	return jwt.sign(data, secret, {});
};

// Token Verification Function
module.exports.verify = (req, res, next) => {

	console.log(req.headers.authorization);

	let token= req.headers.authorization;

	if(typeof token === "undefined"){
		return res.send({
			auth: "Failed. No token."
		});
	} else {
		token = token.slice(7, token.length);

		console.log(token);
		jwt.verify(token, secret, function(err, decodedToken){

			if(err){
				return res.send({
					auth: "Failed",
					message: err.message
				});
			} else{

						
				console.log(decodedToken);

				
				req.user = decodedToken

				next()

			}
		})
	}
};

// [SECTION] Verify Admin Middleware
module.exports.verifyAdmin = (req, res, next) => {

	if(req.user && req.user.isAdmin){
		// If logged in user, based on his token is an admin, we will proceed to the next middleware/controller.
		next()
	} else {

		 return res.status(403).json({
            auth: "Failed",
            message: "Action Forbidden"
		})
	}
}