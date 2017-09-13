/* 
 * 开发环境配置文件
 * @author aokihu aokihu@gmail.com
 * @version 1.0.0
 */

export default {
  // 运行环境
  env: 'development',
  // 数据库配置
  database: {
    adapter: 'postgres',
    host: 'localhost',
    port: '5432',
    dbname: 'aokihu',
    password: '',
    user: 'aokihu',
  },
  // HTTP 服务器配置
  http: {
    port: 8000,
  },
};
