const express = require("express");
const path = require("path");
const app = express();

// middlewares
app.use(express.json()); //parse json bodies into the request object

// routes

app.use("/", express.static(path.join(__dirname, "/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/build/index.html")),
);

// listen on pc port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sever running on port ${PORT}`));
