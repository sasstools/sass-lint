'use strict';

class SassLintFailureError extends Error {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}

class MaxWarningsExceededError extends Error {
  constructor (message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}

module.exports = {
  SassLintFailureError,
  MaxWarningsExceededError
};
