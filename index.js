const express = require("express");
const path = require("path");
const db = {
	data: require("./db/db.json"),
	get: function(id) {
		if(id) {
			return null;
		} else {
			return this.data;
		}
	},
	add: function(entry) {
		this.data.push(entry);
		return entry;
	},
	remove: function(id) {
		return null;
	}
}

const PORT = 3000;
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/notes", (req, res) => {
	res.json(db.get());
});

app.post("/api/notes", (req, res) => {
	res.json(db.add(req.body));
});

app.delete("/api/notes/:id", (req, res) => {
	res.send("Delete");
});

app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "view", "notes.html"));
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "view", "index.html"));
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));