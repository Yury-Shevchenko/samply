// Error handlers for the Express side of the combined server.
// Express now serves only JSON API clients (/api/*, /webapi/*, /save),
// so all error responses are JSON — no Pug rendering.

exports.catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

exports.notFound = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

// Mongoose/validator validation errors → 400 JSON.
exports.flashValidationErrors = (err, req, res, next) => {
  if (!err.errors) return next(err);
  const errors = Object.keys(err.errors).map((key) => err.errors[key].message);
  res.status(err.status || 400).json({ errors });
};

exports.developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || '';
  res.status(err.status || 500).json({
    message: err.message,
    status: err.status,
    stack: err.stack,
  });
};

exports.productionErrors = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
};
