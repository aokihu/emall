/**
 * @module Router
 * @description 角色管理
 * @author aokihu aokihu@gmail.com
 * @license BSD-3
 * @version 1.0.0
 */

import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as Sequelize from 'sequelize';
import Log from '../lib/log';

const router: Router = new Router({prefix: '/v1/role'});

router
/**
 * @api GET /role/ 获取所有角色信息
 */
.get('/', async (ctx: Koa.Context, next) => {

  const {role} = ctx.state.db.model;
  try {
    const _role = await role.findAll();
    ctx.body = _role;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
  }
  await next();
});

export default router;
