import Base from './base';

export default class Forbidden extends Base {
  constructor(message = '') {
    super(`Forbidden. ${message}`, 403);
  }
}