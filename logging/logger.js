const { getContext } = require("../context/contextStore");
const { saveLog } = require("../db/logRepository");

async function log(message) {
  const context = getContext();
  const entry = {
    requestId: context?.requestId || "NO_CONTEXT",
    message,
    timestamp: new Date(),
  };

  console.log(entry);
  await saveLog(entry);
}

module.exports = { log };