const { getDB } = require("../config/db");

async function saveLog(entry) {
  const db = getDB();
  await db.collection("logs").insertOne(entry);
}

async function getLogsByRequestId(requestId) {
  const db = getDB();
  return db.collection("logs")
    .find({ requestId })
    .sort({ timestamp: 1 })
    .toArray();
}

module.exports = { saveLog, getLogsByRequestId };
