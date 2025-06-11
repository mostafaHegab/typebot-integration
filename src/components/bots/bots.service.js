const axios = require("axios");

exports.fetchBots = async () => {
	const res = await axios.get(`${process.env.TYPEBOT_API_BASE_URL}/typebots`, {
		params: {
			workspaceId: process.env.TYPEBOT_WORKSPACE_ID,
		},
		headers: {
			Authorization: `Bearer ${process.env.TYPEBOT_API_KEY}`,
		},
	});
	return res.data;
};

exports.fetchBotById = async (botId) => {
	const res = await axios.get(`${process.env.TYPEBOT_API_BASE_URL}/typebots/${botId}`, {
		params: {
			workspaceId: process.env.TYPEBOT_WORKSPACE_ID,
		},
		headers: {
			Authorization: `Bearer ${process.env.TYPEBOT_API_KEY}`,
		},
	});
	return res.data;
};

exports.fetchBotAnalytics = async (botId) => {
	const res = await axios.get(`${process.env.TYPEBOT_API_BASE_URL}/typebots/${botId}/analytics/stats`, {
		params: {
			workspaceId: process.env.TYPEBOT_WORKSPACE_ID,
		},
		headers: {
			Authorization: `Bearer ${process.env.TYPEBOT_API_KEY}`,
		},
	});
	return res.data?.stats || {};
};
