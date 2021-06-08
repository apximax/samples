import {Category} from '@core-domain';
import {Successful} from '@core-libraries/responses';

export async function basis(context) {
  const {documents, meta} = await Category.basis();

  context.body = new Successful({categories: documents, meta});
}

export async function children(context) {
  const {id} = context.params;
  const {documents, meta} = await Category.children(id);

  context.body = new Successful({categories: documents, meta});
}

export async function list(context) {
  const {
    request: {query, paging},
  } = context;

  const {documents, meta} = await Category.search(query, {...paging, limit: 0});
  context.body = new Successful({categories: documents, meta});
}

export async function one(context) {
  const {id} = context.params;
  const category = await Category.one({_id: id});

  context.body = new Successful({category});
}
