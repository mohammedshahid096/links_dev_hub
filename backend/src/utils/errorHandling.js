// utils/errorHandler.js
const httpErrors = require("http-errors");
const { isCelebrateError } = require("celebrate");

class ErrorHandler {
  handleCustomErrorService(error, next) {
    let httpError;
    if (error instanceof httpErrors.HttpError) {
      httpError = error;
    } else if (error.name === "ValidationError") {
      httpError = httpErrors.BadRequest(error.message);
    } else {
      httpError = httpErrors.InternalServerError(error.message);
    }

    next(httpError);
  }

  handleMainErrorService(err, res) {
    if (isCelebrateError(err)) {
      // Extract Joi validation errors
      const validationError = {};
      for (const [key, value] of err.details.entries()) {
        validationError[key] = value.details.map((detail) => detail.message);
      }

      // Get the first error message (across all validation segments)
      const firstErrorMessage = Object.values(validationError)
        .flat() // Flatten to merge all arrays
        .shift(); // Get the first error message

      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: firstErrorMessage || "Validation error", // Show only the first error
        details: validationError, // Still include all errors for debugging
      });
    } else {
      res.status(err.status || 500).json({
        success: false,
        statusCode: err.status || 500,
        message: err.message || "internal server error",
        errorType: err.name,
        stack: err.stack || "not present",
      });
    }
  }
}

module.exports = new ErrorHandler();
