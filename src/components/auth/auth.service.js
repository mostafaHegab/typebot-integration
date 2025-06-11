const jwt = require("jsonwebtoken");

exports.authenticateUser = (email, password) => {
	if (email !== process.env.LOGIN_EMAIL || password !== process.env.LOGIN_PASSWORD) {
		return null;
	}
	return { email: email };
};

exports.generateToken = (user) => {
	const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRATION || "1h",
	});
	return token;
};
