const { log } = require("../logging/logger");

(async () => {
  await log("Child process started");
  setTimeout(async () => {
    await log("Child process finished work");
    process.exit(0);
  }, 1000);
})();