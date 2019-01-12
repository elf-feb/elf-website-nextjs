# nextjs-typescript-hapi-saga-immutable

[![NPM version][npm-version-image]][npm-url] [![NPM downloads][npm-downloads-image]][downloads-url] [![MIT License][license-image]][license-url] [![Build Status][travis-image]][travis-url]

## RUN
```bash
yarn install
yarn dev

# open localhost:3100
```

## TODO
* saga ---> success
* immutable ---> success
* env
* md
* intl
* styled-components
* fetch cancel requests
* hapijs
* header
* pm2.json
* try / catch & React Error Boundary

## *intl 国际化 方案*

> 参考其他方案:
>
> 1. next-i18next-example

测试 国际化, 请配置 **hosts** 文件

```bash
127.0.0.1 	www.website.com   # 默认
127.0.0.1 	zh.website.com    # 中文
127.0.0.1   en.website.com    # 英文
127.0.0.1 	fr.website.com    # 法语
127.0.0.1 	jp.website.com    # 日语 ()
127.0.0.1 	test.website.com  # 错误名称 => 改为 缺省值: 中文
```

切换语言时, 请保留当前 路由信息, 然后 **硬跳转 (丢失 redux 信息; 重新初始化)**, 并提示用户 重新获取信息中
