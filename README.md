# nextjs-typescript-hapi-saga-immutable

[![TypeScript](https://badges.frapsoft.com/typescript/version/typescript-next.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badge/)    

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)   



## RUN
```bash
yarn install
yarn dev

# open localhost:3100
```

## TODO
* saga                    ---> success
* immutable               ---> success
* intl                    ---> success
* md                      ---> success
* hapijs                  ---> success
* styled-components       ---> success
* env                     ---> success
* pm2.json                ---> success
* unit-test
* fetch cancel requests
* header
* try / catch & React Error Boundary

## *intl 国际化 方案*

> 参考其他方案:
>
> 1. next-i18next-example

>
> 修改 默认配置, 请修改两个文件 *server/index.ts* & *utils/checkLocales.ts* & *scripts/default-lang.js*

测试 国际化, 请配置 **hosts** 文件

```bash
127.0.0.1 	www.website.com   # 默认
127.0.0.1 	zh.website.com    # 中文
127.0.0.1   en.website.com    # 英文
127.0.0.1 	fr.website.com    # 法语
127.0.0.1 	ja.website.com    # 日语 ()
127.0.0.1 	test.website.com  # 错误名称 => 改为 缺省值: 中文
```

切换语言时, 请保留当前 路由信息, 然后 **硬跳转 (丢失 redux 信息; 重新初始化)**, 并提示用户 重新获取信息中

## BUG list

* 线上环境 语言不相同, 本地 prod 没问题 => 需要检查
