const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const accessToken = req.cookies.authToken;
	if (!accessToken) {
		return res.status(401).json({ message: "Unauthorized access" });
	}

	try {
		const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
		req.user = decoded;
		return next();
	} catch (error) {
		return res.status(401).json({ message: "Invalid token" });
	}
};
