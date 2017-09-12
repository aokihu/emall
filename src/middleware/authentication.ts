/**
 * Authentication.ts
 * @module Express.Middleware
 * @author aokihu aokihu@gmail.com
 * @license BSD-3
 * @version 1.0.0
 */

import * as Express from 'express';
import * as R from 'ramda';
import privilige from '../configs/privilige';

/**
 * 用户认证
 * @param req http请求对象
 * @param res http回复对象
 * @param next 下一步调用
 */
export default function Authentication(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction,
) {

    // 用户认证步骤

    // 1. 检查路由是否在权限管理范围内
    const router = req.route;
    console.log(router);

    // 1. 获取用户的请求头部中的session字段
    const {session} = req.headers;

    // 1.1 没有seesion字段,抛出错误403
    if (R.isNil(session)) {
      res.status(403).send('You have not login!');
    }

    // 1.2 检查session是否有效

    // 传递到下一个步骤
    next();
}
