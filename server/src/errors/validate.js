// @flow

import AppError from './app';

export default class extends AppError {
  error: any
  constructor(error: any, message?: string) {
    // Providing default message and overriding status code.
    super(message || 'Bad request error', 400);
    this.error = error;
  }
}
