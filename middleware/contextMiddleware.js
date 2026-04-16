const { v4: uuidv4 } = require("uuid");
const { runWithContext } = require("../context/contextStore");

function contextMiddleware(req, res, next) {
  const context = {
    requestId: uuidv4(),
    startTime: Date.now(),
  };

  
  runWithContext(context, () => {
    next();
  });
}

module.exports = contextMiddleware;
