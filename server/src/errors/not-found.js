// @flow

import AppError from './app';

export default class extends AppError {
  constructor(message: string) {
    // Providing default message and overriding status code.
    super(message || 'Entity is not found', 404);
  }
}
