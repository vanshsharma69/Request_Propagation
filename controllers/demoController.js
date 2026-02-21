const { log } = require("../logging/logger");
const { fork } = require("child_process");
const path = require("path");
const { getContext } = require("../context/contextStore");

async function handleDemo(req, res) {
  await log("Request received");

  setTimeout(async () => {
    await log("Async operation complete");
  }, 500);

  // Spawn child process with ENV
  const context = getContext();

  fork(path.join(__dirname, "../processes/childWorker.js"), [], {
    env: {
      ...process.env,
      REQUEST_ID: context.requestId,
    },
  });

  res.json({ requestId: context.requestId });
}

module.exports = { handleDemo };