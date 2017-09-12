/**
 * main.ts
 * @module none
 * @author aokihu aokihu@gmail.com
 * @license BSD-3
 * @version 1.0.0
 */
import * as Koa from 'koa';
import bodyParser from 'koa-bodyparser-ts';
import * as path from 'path';

// TODO 加载路由
import RouterAuthentication from './routers/authentication';
import RouteCategory from './routers/category';

// TODO 加载配置文件
const CURRENT_ENV: string = process.env.NODE_ENV;
const CONFIG = require(path.resolve(__dirname, 'configs', `${CURRENT_ENV}`)).default;

// TODO 启动HTTP服务器
const httpServer: Koa = new Koa();

// 获取HTTP服务器配置信息
const {http} = CONFIG;

// 加载中间件
httpServer.use(bodyParser());
httpServer.use((ctx: Koa.Context, next) => {ctx.state.config = CONFIG; next(); });

// 加载路由
httpServer.use(RouteCategory.routes());
httpServer.use(RouterAuthentication.routes());

// HTTP服务器开始运行
httpServer.listen(http.port);
