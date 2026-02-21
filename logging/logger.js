const { getContext } = require("../context/contextStore");
const { saveLog } = require("../db/logRepository");

async function log(message) {
  const context = getContext();
  const requestId = context?.requestId || process.env.REQUEST_ID || "NO_CONTEXT";
  const entry = {
    requestId,
    message,
    timestamp: new Date(),
  };

  console.log(entry);
  await saveLog(entry);
}

module.exports = { log };