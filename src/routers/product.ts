/**
 * @module Router
 * @description 产品管理路由
 * @author aokihu aokihu@gmail.com
 * @license BSD-3
 * @version 1.0.0
 */

 import * as Koa from 'koa';
 import * as Router from 'koa-router';

 const router: Router = new Router({prefix: '/product'});

 /**
  * @api GET /product/
  * @desc 获取所有的产品信息
  * @param {?number} Request.query.page 查询的页
  * @param {?limit} Request.query.limit 每页查询的数量
  * @return {Array} 产品列表信息, 默认返回10个结果
  */
 router.get('/', (ctx: Koa.Context) => {
  const {page, limit} = ctx.request.query;
  ctx.body = {page, limit};
 })

 /**
  * @api GET /product/:id
  * @param {string} id 产品id
  */
 .get('/:id', (ctx: Koa.Context) => {
  ctx.response.status = 404;
  ctx.response.body = `Not found product with id:${ctx.params.id}`;
 })

 /**
  * @api POST /product/
  * @desc 添加一个新的产品
  */
 .post('/', (ctx: Koa.Context) => {
  ctx.body = 'success';
 })

 /**
  * @api DELETE /product/:id
  * @desc 删除一个产品
  * @param {string} id 产品ID
  */
 .del('/:id', (ctx: Koa.Context) => {
  //
 })

 /**
  * @api PUT /product/:id
  * @desc 更新一个产品的信息
  * @param {string} id 产品ID
  * @param {any} Request.body 产品的更新信息
  */
 .put('/:id', (cts: Koa.Context) => {
  //
 });

 export default router;
