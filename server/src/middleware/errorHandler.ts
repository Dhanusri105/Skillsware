import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';
import { env } from '../config/env';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || (res.statusCode !== 200 ? res.statusCode : 500);
  const message = err.message || 'Internal Server Error';

  const response: ApiResponse = {
    success: false,
    error: message,
  };

  if (env.NODE_ENV === 'development' && !err.isOperational) {
    console.error('💥 Unhandled Error:', err);
  }

  res.status(statusCode).json(response);
}
