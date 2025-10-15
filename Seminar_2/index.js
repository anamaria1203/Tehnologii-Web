const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => res.send("Hello Web!"));

app.listen(8080);
