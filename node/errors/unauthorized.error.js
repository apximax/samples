import Base from './base';

export default class Unauthorized extends Base {
  constructor(message = '') {
    super(`Unauthorized. ${message}`, 401);
  }
}