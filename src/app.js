require("dotenv").config();

const path = require("path");

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/health", (req, res) => {
	res.status(200).json({ message: "API is healthy" });
});

app.use("/auth", require("./components/auth/auth.routes"));
app.use("/bots", require("./components/bots/bots.routes"));

app.use("/api", (req, res) => {
	res.status(404).json({ message: "Endpoint not found" });
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: "Internal server error" });
});

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
