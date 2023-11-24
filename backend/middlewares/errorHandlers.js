class ErrorHandler extends Error {
  constructor(error, statusCode, details = null) {
    super(typeof error === 'object' ? error.error : error);
    this.details = typeof error === 'object' ? error.details || null : details;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    const response = { error: err.message };
    if (err.details !== null) {
      response.details = err.details;
    }
    return res.status(err.statusCode).json(response);
  }

  res.status(500).json({ error: 'Internal server error' });
};

const sequelizeErrorHandler = (err, req, res, next) => {
  // Handle Sequelize errors as needed
  if (err.name === 'SequelizeValidationError') {
    const errorMessages = err.errors.map((e) => e.message);
    return  res.status(400).json({ error: 'Validation error', details: errorMessages });
  }

  next(err); // Pass other errors to the next middleware
};

module.exports = { ErrorHandler, errorHandler, sequelizeErrorHandler };
