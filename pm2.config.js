/*
 * @Author: yanxiaodi 929213769@qq.com
 * @Date: 2019-01-15 23:49:16
 * @LastEditors: yanxiaodi 929213769@qq.com
 * @LastEditTime: 2019-01-16 17:23:49
 * @Description: pm2 config
 */
module.exports = {
  apps: [{
    "name": "nextjs-hapi-saga",                     // 应用名称
    "script": ".next/production-server",            // 实际启动脚本
    "cwd": "./",                                    // 当前工作路径
    "watch": [                                      // 监控变化的目录，一旦变化，自动重启
      "bin",
      "routers",
      "components",
      "pages",
      "scripts",
    ],
    "ignore_watch": [                               // 从监控目录中排除
      "node_modules",
      "logs",
      "public",
    ],
    "watch_options": {                              //监视配置, 具体见 http://pm2.keymetrics.io/docs/usage/watch-and-restart/
      "followSymlinks": false
    },
    "error_file": "./logs/app-err.log",             // 错误日志路径
    "out_file": "./logs/app-out.log",               // 普通日志路径
    "env": {
      "NODE_ENV": "production"                      // 环境参数，当前指定为生产环境
    },
  }],
}
