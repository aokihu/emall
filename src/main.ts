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
import * as mount from 'koa-mount';
import * as server from 'koa-static';
import * as path from 'path';

// TODO 加载路由
import {loadRouters} from './lib/koa-rest-router';

// TODO 加载数据模型
import Database from './lib/database';

// TODO 加载配置文件
const CURRENT_ENV: string = process.env.NODE_ENV;
const CONFIG = require(path.resolve(__dirname, 'configs', `${CURRENT_ENV}`)).default;

// TODO 数据模型初始化
const dbagent = new Database(CONFIG);
dbagent.loadModelsFromFolder('./models');

// TODO 启动HTTP服务器
const httpServer: Koa = new Koa();

// TODO 使用中间件
httpServer.use(bodyParser());
httpServer.use(async (ctx: Koa.Context, next) => {
  ctx.state.config = CONFIG;
  ctx.state.db = dbagent;
  await next();
});

// TODO 加载路由
loadRouters(httpServer, './routers');

// TODO 获取HTTP服务器配置信息
const {http} = CONFIG;

// TODO 配置静态服务器
httpServer.use(mount('/admin', server(path.resolve(__dirname, 'static', 'admin'))));

// TODO HTTP服务器开始运行
httpServer.listen(http.port);
