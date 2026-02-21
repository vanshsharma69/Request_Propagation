const express = require("express");
const path = require("path");
const contextMiddleware = require("./middleware/contextMiddleware");
const { connectDB } = require("./config/db");
const { handleDemo } = require("./controllers/demoController");
const { getLogsByRequestId } = require("./db/logRepository");

const app = express();

app.use(express.json());
app.use(contextMiddleware);
app.use(express.static("public"));

app.get("/demo", handleDemo);

app.get("/logs/:requestId", async (req, res) => {
  const logs = await getLogsByRequestId(req.params.requestId);
  res.json(logs);
});

connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
});