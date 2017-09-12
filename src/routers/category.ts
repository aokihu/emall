/**
 * 
 */

 import * as Router from 'koa-router';
 const router: Router = new Router({prefix: '/category'});

 /**
  * @api GET /category/
  */
 router.get('/', async (ctx) => {
    ctx.body = [
      {title: 'hahaha'},
    ];
 })
 /**
  * @api GET /category/:id
  */
 .get('/:id', async (ctx) => {
  ctx.body = {id: ctx.params.id};
 });

 export default router;
