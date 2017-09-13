/**
 * @file log.ts
 * @author aokihu aokihu@gmail.com
 * @version 1.0.0 
 */

 /**
  * @class Log
  * @desc 统一的日志记录工具
  */

  /**
   * @func getNow()
   * @desc 获取当前的时间戳
   */
 function getNow(): string {
   const now = new Date();
   const Y = now.getFullYear();
   const M = now.getMonth();
   const D = now.getDay();
   const h = now.getHours();
   const m = now.getMinutes();
   const s = now.getSeconds();
   const ms = now.getMilliseconds();

   return `${Y}-${M}-${D} ${h}:${m}:${s} ${ms}`;
 }

 /**
  * @class Log
  * @desc 日志管理对象
  */
 export default class Log {

  /**
   * @public
   * @func log
   * @abstract 显示日志
   */
   public static log(...message: string[]) {
    Log.push('📒 LOG', ...message);
   }

   /**
    * @public
    * @func debug
    * @abstract 显示调试信息
    * @param message 调试信息
    */
   public static debug(...message: string[]) {
    Log.push('🐞 DEBUG', ...message);
   }

   /**
    * @public
    * @func success
    * @abstract 显示成功的信息
    * @param message 成功信息
    */
   public static success(...message: string[]) {
    Log.push('✅  SUCCESS', ...message);
   }

   /**
    * @public
    * @func fail
    * @abstract 显示失败的信息
    * @param message shibai de xinxi 
    */
   public static fail(...message: string[]) {
     Log.push('❌  FAIL', ...message);
   }

   /**
    * 打印日志消息
    * @private
    * @param type 日志类型
    * @param message 日志消息
    */
   private static push(type: string, ...message: string[]) {
    const timestamp = getNow();
    const stamp = `[${timestamp}]\t${type}`;
    console.log(stamp, ...message);
  }
 }
