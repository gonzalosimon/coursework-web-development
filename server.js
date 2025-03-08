"use strict";

const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

function loadJSONData(filename) {
  const filePath = path.join(__dirname, "data", filename);
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error loading/parsing JSON from file:", filename, err);
    return [];
  }
}

// Introduction page (root)
app.get("/", (req, res) => {
  const timelineData = loadJSONData("timelineData.json");
  if (timelineData.length === 0) {
    return res.status(500).send("Error loading timeline data");
  }
  res.render("index", { timelineData });
});

// Timeline page
app.get("/timeline", (req, res) => {
  const timelineData = loadJSONData("timelineData.json");
  res.render("timeline", { timelineData });
});

// Early ISPs page
app.get("/early-isps", (req, res) => {
  const earlyISPs = loadJSONData("earlyISPs.json");
  res.render("earlyISPs", { earlyISPs });
});

// Commercial Provision page
app.get("/commercial-provision", (req, res) => {
  const commercialData = loadJSONData("commercialProvision.json");
  res.render("commercialProvision", { commercialData });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
