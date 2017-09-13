/**
 * @module Router
 * @description 用户管理
 * @author aokihu aokihu@gmail.com
 * @license BSD-3
 * @version 1.0.0
 */

 import * as Koa from 'koa';
 import * as Router from 'koa-router';
 import * as Sequelize from 'sequelize';
 import Log from '../lib/log';

 const router: Router = new Router({prefix: '/v1/user'});

 router
 /**
  * @api GET /user/ 获取所有用户的简单资料
  */
 .get('/', async (ctx: Koa.Context, next) => {

  const {user} = ctx.state.db.model;
  const result = await user.all();
  ctx.body = result;

  await next();
})

/**
 * @api GET /user/:id 获取指定用用不的信息
 * @param Request.params.id 用户ID
 */
.get('/:id', async (ctx: Koa.Context, next) => {
  const {user} = ctx.state.db.model;
  const {id} = ctx.params;

  try {
    const _user = await user.findOne({where: {id}});
    ctx.body = _user;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
  }

  await next();
})

 /**
  * @api POST /user/ 添加新用户
  */
  .post('/', async (ctx: Koa.Context, next) => {
    const {user} = ctx.state.db.model;
    const {name, password} = ctx.request.body;

    const _user = user.build({name, password});

    try {
    const result = await _user.save();
    ctx.body = result;
    } catch (err) {
      ctx.status = 500;
      ctx.body = {err: err.parent.detail};
    }

    await next();
  })

  /**
   * @api PUT /user/:id 更改用户数据
   * @param Request.password 用户的新密码
   */
  .put('/:id', async (ctx: Koa.Context, next) => {
    const {user} = ctx.state.db.model;
    const {id} = ctx.params;

    try {
      const _user = await user.findOne({where: {id}});
      const result = await _user.update(ctx.request.body, {fields: ['password']});
      ctx.body = result;
    } catch (err) {
      ctx.status = 500;
      ctx.body = err;
    }

    await next();
  })
  /**
   * @api DELETE /user/:id 删除一个用户
   */
  .del('/:id', async (ctx: Koa.Context, next) => {

    const {user} = ctx.state.db.model;
    const {id} = ctx.params;

    try {
      const result = await user.destroy({where: {id}});
      ctx.body = result;
    } catch (err) {
      ctx.status = 500;
      ctx.body = err;
    }

    await next();
  });

 export default router;
