const services = require("./bots.service");

const db = require("../../db");

exports.getAllBots = async (req, res) => {
	try {
		const data = await services.fetchBots();
		console.log("Fetched bots data:", data);
		return res.render("bots", { bots: data.typebots });
	} catch (error) {
		console.error("Error fetching bots:", error.response?.data || error.message);
		return res.status(500).json({ message: "Error retrieving bots", error: error.message });
	}
};

exports.getBotById = async (req, res) => {
	const { botId } = req.params;
	try {
		const botData = await services.fetchBotById(botId);
		if (!botData) {
			return res.status(404).json({ message: "Bot not found" });
		}
		// return res.json(botData);

		const publicId = botData.typebot.publicId;
		if (!publicId) {
			return res.status(404).json({ message: "Public ID not found for the bot" });
		}
		const embedUrl = `${process.env.TYPEBOT_EMBED_BASE_URL}/${publicId}`;

		db.run(`INSERT INTO sessions (bot_id, email) VALUES (?, ?)`, [botId, req.user.email]);

		return res.render("bot", { bot: botData, embedUrl });
	} catch (error) {
		console.error("Error fetching bot by ID:", error);
		return res.status(500).json({ message: "Error retrieving bot", error: error.message });
	}
};

exports.getBotAnalytics = async (req, res) => {
	const { botId } = req.params;
	try {
		const analytics = await services.fetchBotAnalytics(botId);
		const usersSessions = await new Promise((resolve, reject) => {
			db.all(`SELECT email, MAX(started_at) AS lastRun FROM sessions WHERE bot_id = ? GROUP BY email`, [botId], (err, rows) => {
				if (err) {
					return reject(err);
				}
				resolve(rows);
			});
		});
		return res.render("analytics", { analytics, usersSessions });
	} catch (error) {
		console.error("Error fetching bot analytics:", error);
		return res.status(500).json({ message: "Error retrieving bot analytics", error: error.message });
	}
};
