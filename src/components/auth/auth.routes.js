const express = require("express");

const controller = require("./auth.controller");

const router = express.Router();

router.get("/login", controller.loginPage);
router.post("/login", controller.login);

module.exports = router;
