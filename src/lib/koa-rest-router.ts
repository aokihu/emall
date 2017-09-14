import * as fs from 'fs';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as path from 'path';
import * as R from 'ramda';
import * as Sequelize from 'sequelize';
import Log from './log';

export default class RestRouter extends Router {

  private modelName: string; // 模型名称，一般就是表的单数形式(Sequelize会自动)

  /**
   * @constructor RestRouter
   * @param modelName 模型名称
   * @param options Koa-Router的设置参数
   */
  constructor(modelName, options) {
    super(options);
    this.modelName = modelName;

    /**
     * @api GET / 获取所有的数据
     */
    this.get('/', async (ctx: Koa.Context, next) => {
      const model = ctx.state.db.model[this.modelName];
      const {page, limit} = ctx.query;

      try {
        ctx.body = await this.getAll(model, page, limit);
      } catch (err) {
        ctx.status = 500;
        ctx.body = err;
      }

      await next();

    });

    /**
     * @api GET /:id 获取指定id的数据
     */
    this.get('/:id', async (ctx: Koa.Context, next) => {
      const model = ctx.state.db.model[this.modelName];
      const {id} = ctx.params;

      try {
        ctx.body = await this.getById(model, id);
      } catch (err) {
        ctx.status = 500;
        ctx.body = err;
      }

      await next();
    });

    /**
     * @api POST / 创建一个新的数据对象
     */
    this.post('/', async (ctx: Koa.Context, next) => {
      const model = ctx.state.db.model[this.modelName];

      try {
        ctx.body = await this.create(model, ctx.request.body);
      } catch (err) {
        ctx.status = 500;
        ctx.body = err;
      }

      await next();

    });

    /**
     * @api PUT /:id 更新指定ID的对象数据
     */
    this.put('/:id', async (ctx: Koa.Context, next) => {
      const model = ctx.state.db.model[this.modelName];

      const {id} = ctx.params;
      try {
        ctx.body = await this.updateOne(model, id, ctx.request.body);
      } catch (err) {
        ctx.status = 500;
        ctx.body = err;
      }

      await next();
    });

    /**
     * @api DELETE /:id 删除指定ID的对象数据
     */
    this.del('/:id', async (ctx: Koa.Context, next) => {
      const model = ctx.state.db.model[this.modelName];

      const {id} = ctx.params;

      try {
        ctx.body = await this.remove(model, id);
      } catch (err) {
        ctx.status = 500;
        ctx.body = err;
      }

      await next();

    });
  }

  /**
   * 获取所有的对象数据
   * @param page 分页的起始页
   * @param limit 每页显示的项目数量
   */
  private getAll(model, page= 0, limit= 10, others: Sequelize.Options= {}) {
    return model.findAll(others);
  }

  /**
   *
   * @param id 数据对象的id
   */
  private getById(model, id: string, others: Sequelize.Options = {}) {
    return model.findById(id, others);
  }

  private async updateOne(model, id: string, data: object, others: Sequelize.Options = {}) {

    const target: Sequelize.Instance<any> = await model.findById(id);
    return target.update(data);

  }

  private async create(model, data: object) {
    const target: Sequelize.Instance<any> = await model.build(data);
    return target.save();
  }

  private remove(model, id) {
    return model.destroy({where: {id}});
  }

}

/**
 * 加载指定目录中的路由
 * @param app Koa实例
 * @param routersPath 将要加载的routers的路径
 */
export function loadRouters(app: Koa, routersPath: string) {

  const realPath = path.resolve(__dirname, '../', routersPath);

      // TODO 检查目录是否存在
  const checkResult = fs.existsSync(realPath);

  if (checkResult) {
        // TODO 读取该目录下的所有数据模型文件名
        const files = fs.readdirSync(realPath);

        // TODO 过滤掉首字母是特殊字符的文件
        const avaliableFiles = R.filter( (file: string) => /^[a-z]/.test(file))(files);

        avaliableFiles.map(async (file: string) => {
          const realFilename = path.resolve(realPath, file);
          const router: Router = loadRouter(realFilename);
          app.use(router.routes());
        });
      }

}

  /**
   * 加载数据定义文件
   * @param file 数据模型定义文件
   */
function loadRouter(file: string): Router {
    const _filename = R.last(file.split('/'));
    const modelname = _filename.split('.')[0];

    Log.success(modelname, 'router loaded');
    return require(file).default;
}
