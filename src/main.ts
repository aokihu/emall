/**
 * main.ts
 * @module none
 * @author aokihu aokihu@gmail.com
 * @license BSD-3
 * @version 1.0.0
 */

// TODO 引用第三方库
import * as Koa from 'koa';
import bodyParser from 'koa-bodyparser-ts';
import * as path from 'path';

// TODO 加载路由
import RouterAuthentication from './routers/authentication';
import RouteCategory from './routers/category';
import RouteProduct from './routers/product';

// TODO 加载配置文件
const CURRENT_ENV: string = process.env.NODE_ENV;
const CONFIG = require(path.resolve(__dirname, 'configs', `${CURRENT_ENV}`)).default;

// TODO 启动HTTP服务器
const httpServer: Koa = new Koa();

// TODO 使用中间件
httpServer.use(bodyParser());
httpServer.use((ctx: Koa.Context, next) => {ctx.state.config = CONFIG; next(); });

// TODO 加载路由
httpServer
.use(RouteCategory.routes())
.use(RouterAuthentication.routes())
.use(RouteProduct.routes());

// TODO 获取HTTP服务器配置信息
const {http} = CONFIG;

// TODO HTTP服务器开始运行
httpServer.listen(http.port);
