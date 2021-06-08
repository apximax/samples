import Base from './base';

export default class InvalidFields extends Base {
  constructor(fields = []) {
    super('One or more fields failed validation', 400);

    if (!(fields instanceof Array)) {
      throw new Base(`InvalidFields 'fields' argument should be an array. Given ${fields.constructor.name}`);
    }

    this.fields = fields;
  }
}