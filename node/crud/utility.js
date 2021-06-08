import omit from 'lodash/omit';

import {is} from '../utils';
import {Base, InvalidFields} from '../errors';

export function id({_id}) {
  try {
    return is.func(_id.toString) ? _id.toString() : _id;
  } catch (error) {
    throw new Base(error.message);
  }
}

export function flat(object) {
  if (!is.exist(object)) {
    throw new Base(`flat\`s 'object' argument should be an object. Given ${object.constructor.name}`);
  }

  try {
    return is.func(object.toObject)
      ? object.toObject()
      : JSON.parse(JSON.stringify(object));

  } catch (error) {
    throw new Base(error.message);
  }
}

export function purify(model, values = []) {
  if (!is.exist(model)) {
    return void(0);
  }

  if (!is.array(values)) {
    throw new Base(`prettify\`s 'values' argument should be an array. Given ${values.constructor.name}`);
  }

  try {
    const object = flat(model);
    const prettified = omit(object, ['_id', '__v', ...values]);

    return {id: id(model), ...prettified};
  } catch (error) {
    throw new Base(error.message);
  }
}

export function catcher(error) {
  switch (error.name) {
    case 'Base': {
      throw error;
    }

    case 'ValidationError': {
      const {errors} = error;
      const fields = Object.keys(errors)
        .map(path => ({name: path, message: errors[path].message}));

      throw new InvalidFields(fields);
    }

    default: {
      throw new Base(error.message);
    }
  }
}