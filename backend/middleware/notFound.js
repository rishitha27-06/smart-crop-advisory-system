import { ErrorResponse } from './errorHandler.js';

// Not found middleware
export const notFound = (req, res, next) => {
  const error = new ErrorResponse(`Not found - ${req.originalUrl}`, 404);
  next(error);
};
