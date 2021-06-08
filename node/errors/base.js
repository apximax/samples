export default class Base extends Error {
  constructor(message, status = 500) {
    super(message);

    if (typeof status !== 'number') {
      throw new Error(`BaseError: 'status' argument should be a number. Given ${typeof status}`);
    }

    this.name = this.constructor.name;
    this.status = status;

    Error.captureStackTrace(this, this.constructor);
  }
}