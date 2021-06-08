import {Category} from '@core-repository';
import {to} from '@core-libraries/utils';
import {InvalidFields} from '@core-libraries/errors';
import {Service as Redis} from '@core-services/redis';

/**
 * =======
 * Exports
 * =======
 */

export default Object.assign({}, Category, {
  modify,
  search,
  create,
});


/**
 * =======
 * Helpers
 * =======
 */

function validate(object, required) {
  const errors = to.strictly(object, required, 'field is required');

  if (errors) {
    throw new InvalidFields(errors);
  }

  return object;
}

/**
 * =======
 * Operations
 * =======
 */

async function modify(id, form) {
  return await Category.edit(id, form);
}

async function search(condition, options) {
  const {documents, meta} =  await Category.search(condition, options);
  const counts = await Redis.getAllSet('Categories');

  const categories = (counts) ? documents.map((document) => ({
    ...document,
    adverts_count: counts[document.name],
  })) : documents;

  return {documents: categories, meta};
}

async function create(form) {
  const data = validate(form, ['label']);

  return await Category.create(data);
}
