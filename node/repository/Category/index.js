import Mongoose from 'mongoose';

import crud from '@core-libraries/crud';

import Model from './model';

const Category = Mongoose.model('Category', Model);

const operations = crud(Category);

/**
 * =======
 * Exports
 * =======
 */

export default {
  ...operations,
  basis,
  children,
};

/**
 * =======
 * Helpers
 * =======
 */


/**
 * =======
 * Core
 * =======
 */

async function basis() {
  return await operations.search({parent: {'$exists': false}});
}

async function children(id) {
  return await operations.search({parent: id});
}
