const express = require("express");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./controller"));

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));