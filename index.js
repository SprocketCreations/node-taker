const express = require("express");
const path = require("path");

const PORT = 3000;
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "view", "index.html"));
});

app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "view", "notes.html"));
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));