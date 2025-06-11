const express = require("express");

const authMiddleware = require("../../middlewares/auth.middleware");

const controller = require("./bots.controller");

const router = express.Router();

router.get("/", authMiddleware, controller.getAllBots);
router.get("/:botId", authMiddleware, controller.getBotById);
router.get("/:botId/analytics", authMiddleware, controller.getBotAnalytics);

module.exports = router;
