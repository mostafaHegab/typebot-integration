const service = require("./auth.service");

exports.loginPage = (req, res) => {
	try {
		return res.status(200).render("login", { title: "Login" });
	} catch (error) {
		console.error("Error rendering login page:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

exports.login = (req, res) => {
	try {
		const email = req.body?.email;
		const password = req.body?.password;
		if (!email || !password) {
			return res.status(400).json({ message: "Email and password are required" });
		}

		const user = service.authenticateUser(email, password);
		if (!user) {
			return res.status(401).json({ message: "Invalid email or password" });
		}

		const token = service.generateToken(user);
		if (!token) {
			return res.status(500).json({ message: "Failed to generate token" });
		}

		// save token in cookies and redirect to /bots
		res.cookie("authToken", token, { httpOnly: true, secure: true });
		return res.redirect("/bots");
	} catch (error) {
		console.error("Error during login:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};
