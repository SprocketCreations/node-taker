const express = require("express");
const path = require("path");
const db = {
	nextID: 0,
	data: (() => {
		let data = require("./db/db.json");
		this.nextID = this.nextID | 0;
		return data.map(elem => {
			const newElem = { ...elem };
			newElem.id = this.nextID++;
			return newElem;
		});
	})(),
	get: function (id) {
		if (id) {
			return null;
		} else {
			return this.data;
		}
	},
	add: function (entry) {
		entry.id = this.nextID++;
		this.data.push(entry);
		return entry;
	},
	remove: function (id) {
		const length = this.data.length;
		for (let i = 0; i < length; ++i) {
			if (this.data[i].id === id) {
				const target = this.data[i];
				this.data.splice(i, 1);
				return target;
			}
		}
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
	res.json(db.remove(parseInt(req.params.id)));
});

app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "view", "notes.html"));
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "view", "index.html"));
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));