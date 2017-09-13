/**
 * @abstract 读取数据配置文件然后生成数据模型
 * @author aokihu aokihu@gmail.com
 * @version 1.0.0
 */

 import Sequelize from 'sequelize';

 export default class Model {

  public attributes: string[]; // 数据属性

  /**
   * 加载数据定义文件
   * @param file 数据模型定义文件
   */
  public loadModel(file: string) {

  }

}
