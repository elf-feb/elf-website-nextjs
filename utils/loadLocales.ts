/*
 * @Author: yanxiaodi 929213769@qq.com
 * @Date: 2019-01-05 23:33:13
 * @LastEditors: yanxiaodi 929213769@qq.com
 * @LastEditTime: 2019-01-05 23:40:22
 * @Description:
 */
import http from 'axios'
import intl from 'react-intl-universal'

export default (currentLocale: string, that: any): void => {
  // let currentLocale = intl.determineLocale({
  //   urlLocaleKey: 'lang',
  //   cookieLocaleKey: 'lang',
  // })
  http
    .get(`../static/locales/${currentLocale}.json`)
    .then(res => {
      console.log("App locale data", res.data)
      // init method will load CLDR locale data according to currentLocale
      return intl.init({
        currentLocale,
        locales: {
          [currentLocale]: res.data
        }
      })
    })
    .then(() => {
      // After loading CLDR locale data, start to render
      that.setState({ initDone: true })
    })
}
