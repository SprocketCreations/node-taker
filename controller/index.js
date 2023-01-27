const express = require("express");
const router = express.Router();
const path = require("path");

router.use("/api", require("./api"));

router.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "view", "notes.html"));
});

router.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "view", "index.html"));
});

module.exports = router;