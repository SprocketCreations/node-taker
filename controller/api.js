const express = require("express");
const db = require("../src/db");

const api = express.Router();

api.get("/notes", (req, res) => {
	res.json(db.get());
});

api.post("/notes", async (req, res) => {
	res.json(await db.add(req.body));
});

api.delete("/notes/:id", async (req, res) => {
	res.json(await db.remove(parseInt(req.params.id)));
});

module.exports = api;