"use strict";

const express = require("express");
const path = require("path");
const fs = require("fs");
const Ajv = require("ajv");

const app = express();

app.set("view engine", "ejs");

// Serve static files from /public:
app.use(express.static(path.join(__dirname, "public")));

function loadTimelineData() {
  const filePath = path.join(__dirname, "data", "timelineData.json");
  let timelineData = [];

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    timelineData = JSON.parse(raw);

    const schema = {
      type: "array",
      items: {
        type: "object",
        properties: {
          year: { type: "number" },
          title: { type: "string" },
          content: { type: "string" },
          source: { type: "string" },
        },
        required: ["year", "title", "content", "source"],
      },
    };

    const ajv = new Ajv();
    const validate = ajv.compile(schema);

    if (!validate(timelineData)) {
      console.error("Timeline data validation failed:", validate.errors);
      timelineData = [];
    }
  } catch (error) {
    console.error("Error reading/parsing timeline data:", error);
    timelineData = [];
  }

  return timelineData;
}

app.get("/", (req, res) => {
  const timelineData = loadTimelineData();
  if (timelineData.length === 0) {
    return res.status(500).send("Error loading timeline data");
  }

  res.render("index", { timelineData });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
