/**
 * @module Express.Router
 * @author aokihu aokihu@gmail.com
 * @license BSD-3
 * @version 1.0.0
 */

import * as Router from 'koa-router';

const router: Router = new Router({prefix: '/auth'});

/**
 * @api POST /auth/login
 */
router.post('/login', async (ctx) => {
  ctx.type = 'json';
  ctx.body = ctx.request.body;
});

export default router;
