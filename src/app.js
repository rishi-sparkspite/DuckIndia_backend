const express = require("express");
const path = require("path");
const app = express();
app.use(express.static("public"));

app.get("/test", (_req, res) => {
  res.status(200).send("duck India");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
//checkkkk

module.exports = app; 