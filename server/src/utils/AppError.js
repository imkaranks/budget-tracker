const { StatusCodes, ReasonPhrases } = require("http-status-codes");

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends ApiError {
  constructor(message = ReasonPhrases.BAD_REQUEST) {
    super(StatusCodes.BAD_REQUEST, message);
  }
}

class ServerError extends ApiError {
  constructor(message = ReasonPhrases.INTERNAL_SERVER_ERROR) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message);
  }
}

class NotFoundError extends ApiError {
  constructor(message = ReasonPhrases.NOT_FOUND) {
    super(StatusCodes.NOT_FOUND, message);
  }
}

class UnauthorizedError extends ApiError {
  constructor(message = ReasonPhrases.UNAUTHORIZED) {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}

class ForbiddenError extends ApiError {
  constructor(message = ReasonPhrases.FORBIDDEN) {
    super(StatusCodes.FORBIDDEN, message);
  }
}

module.exports = {
  ApiError,
  BadRequestError,
  ServerError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
};
