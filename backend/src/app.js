const express = require("express");
const cors = require("cors");

// Connecting route to the app
const recommendationRoutes =
  require("./routes/recommendations");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "BetterBuy API Running"
  });
});

app.use(
  "/api/recommendations",
  recommendationRoutes
);

module.exports = app;