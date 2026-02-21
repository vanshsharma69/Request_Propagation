const { AsyncLocalStorage } = require("async_hooks");

const asyncLocalStorage = new AsyncLocalStorage();

function runWithContext(context, callback) {
  asyncLocalStorage.run(context, callback);
}

function getContext() {
  return asyncLocalStorage.getStore();
}

module.exports = { runWithContext, getContext };