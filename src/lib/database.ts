/**
 * @file database.ts
 * @author aokihu aokihu@gmail.com
 * @version 1.0.0
 */
import * as fs from 'fs';
import * as path from 'path';
import * as R from 'ramda';
import * as Sequelize from 'sequelize';
import Log from './log';

 /**
  * @class Database
  * @desc 提供所有数据模型统一的操作
  */
export default class Database {

  public model: object;
  private keepClean: boolean; // 保持数据库干净
  private dbagent: Sequelize.Sequelize;

  /**
   * @constructor
   * @param config 全局配置参数
   * @return Database
   */
  constructor(config: any) {

    this.model = new Object();

    const {database} = config;
    const {user, password, host, port, dbname, adapter, keepClean} = database;

    this.keepClean = keepClean;

    const uri = `${adapter}://${user}:${password}@${host}:${port}/${dbname}`;
    this.dbagent = new Sequelize(uri, {logging: false});

    //
    // TODO 测试数据库连接是否正常
    //

    this.dbagent
    .authenticate()
    .then(() => {
      Log.success('Connection has been established successfully.');
    })
    .catch((err) => {
      Log.fail('Unable to connect to the database:', err);
    });

    return this;
  }

  /**
   * 加载数据定义文件
   * @param file 数据模型定义文件
   */
  public async loadModel(file: string): Promise<void> {
    const definition = require(path.resolve(__dirname, '../', file)).default;
    const {tablename, attributes} = definition;

    const model = this.dbagent.define(tablename, attributes);
    this.model[tablename] = model;

    await this.model[tablename].sync({force: this.keepClean});
    Log.success(tablename, 'load');
  }

  /**
   * 自动从数据模型定义的目录中加载所有的数据模型
   * @param folder 数据模型定义目录
   */
  public async loadModelsFromFolder(folder: string): Promise<void> {
    const realPath = path.resolve(__dirname, '../', folder);

    // TODO 检查目录是否存在
    const checkResult = fs.existsSync(realPath);

    if (checkResult) {
      // TODO 读取该目录下的所有数据模型文件名
      const files = fs.readdirSync(realPath);

      // TODO 过滤掉首字母是特殊字符的文件
      const avaliableFiles = R.filter( (file: string) => /^[a-z]/.test(file))(files);

      avaliableFiles.map(async (file: string) => {
        const realFilename = path.resolve(realPath, file);
        await this.loadModel(realFilename);
      });
    }

  }

}
