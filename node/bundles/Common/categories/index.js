import Router from 'koa-router';

import {
  one,
  list,
  basis,
  children,
} from './controllers';

import {paging} from '@core-libraries/middleware';

const router = new Router();

router
  .get('/', paging(), list)
  .get('/basis', basis)
  .get('/:id', one)
  .get('/:id/children', children);

export default router.routes();
