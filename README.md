# nextjs-typescript-hapi-saga-immutable

## RUN
```bash
yarn install
yarn dev

# open localhost:3100
```

## 注意事项
请修改 *hosts* 文件

比如
```shell
vim /etc/hosts

127.0.0.1       www.website.com
127.0.0.1       zh.website.com
127.0.0.1       en.website.com
127.0.0.1       fr.website.com
127.0.0.1       jp.website.com
```

> 目的: 用于 测试 intl 多语言

## TODO
* saga ---> success
* immutable ---> success
* tslint ---> success
* intl (文字, 时间, 数值进制), 浏览器自动检查当前语言环境
* env
* md
* styled-components
* fetch cancel requests
* hapijs
* header
* pm2.json

## FAQ
* 不清楚 nextjs 怎么通过二级 locales 名称切换路由； 暂定计划为: 通过路由参数来配置 + cookie
> 尝试 二级域名判断 语言
