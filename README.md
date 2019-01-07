[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/zeit/next.js/tree/master/examples/with-react-intl)
# Example app with [React Intl][]

## How to use

### Using `create-next-app`

Execute [`create-next-app`](https://github.com/segmentio/create-next-app) with [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) or [npx](https://github.com/zkat/npx#readme) to bootstrap the example:

```bash
npx create-next-app --example with-react-intl with-react-intl-app
# or
yarn create next-app --example with-react-intl with-react-intl-app
```

### Download manually

Download the example:

```bash
curl https://codeload.github.com/zeit/next.js/tar.gz/canary | tar -xz --strip=2 next.js-canary/examples/with-react-intl
cd with-react-intl
```

Install it and run:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

Deploy it to the cloud with [now](https://zeit.co/now) ([download](https://zeit.co/download))

```bash
now
```

## 这个例子背后的想法

此示例应用程序显示如何将[React Intl] []与Next集成。

### 此示例应用的功能

 - 服务器端语言协商
 - 通过`pages / _document.js`自定义来加载Intl语言环境数据
 -  React Intl与[custom App]（https://github.com/zeit/next.js#custom-app）组件的集成
 - `<IntlProvider>`用`locale`，`messages`和`initialNow` props创建
 - 通过`babel-plugin-react-intl`集成提取默认消息
 - 通过构建脚本和定制的Next服务器进行翻译管理
 -  withIntl HOC用于页面，因为injectIntl不提升静态方法。

### 翻译管理

这个应用程序存储`lang /`dir中的翻译和默认字符串。 这个目录有`.messages /`subdir，这是React Intl的Babel插件输出它从源代码中提取的默认消息的地方。 默认消息（此示例应用程序中的“en.json”）也由构建脚本生成。 然后，可以将此文件发送到翻译服务，以便为应用程序应支持的其他语言环境执行本地化。

存在于`lang / * .json`中的已翻译消息文件仅在生产期间使用，并自动提供给`<IntlProvider>`。 在开发期间，使用源代码中定义的`defaultMessage。 要准备用于本地化和生产的示例应用程序，请运行构建脚本并以生产模式启动服务器：

```bash
$ npm run build
$ npm start
```

然后，您可以将浏览器的语言首选项切换为法语，并刷新页面以相应地查看UI更新。

[React Intl]: https://github.com/yahoo/react-intl
