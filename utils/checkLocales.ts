/*
 * @Author: yanxiaodi 929213769@qq.com
 * @Date: 2019-01-06 00:13:49
 * @LastEditors: yanxiaodi 929213769@qq.com
 * @LastEditTime: 2019-01-15 18:10:14
 * @Description: checkLocales.ts
 */
import get from 'lodash/get'
import first from 'lodash/first'
import split from 'lodash/split'
import hasIn from 'lodash/hasIn'
import isString from 'lodash/isString'

export default (param: any | string): string => {
  // param === window.location.hostname
  if (isString(param)) {
    const urlLang = first(split(param, '.', 3))
    const lang = urlLang === 'en'
      ? 'en'
      : urlLang === 'fr'
        ? 'fr'
        : urlLang === 'ja'
          ? 'ja'
          : 'zh'
    return lang
  }

  // param === req
  if (hasIn(param, 'headers.host') && get(param, 'headers.host') !== '') {
    console.log(
      'checkLocales: locales ===> ',
      get(param, 'headers.host'),
    )
    const locales = get(param, 'headers.host')
    if (locales.indexOf('zh') !== -1) { return 'zh' }
    if (locales.indexOf('en') !== -1) { return 'en' }
    if (locales.indexOf('fr') !== -1) { return 'fr' }
    if (locales.indexOf('ja') !== -1) { return 'ja' }
  }
  return 'zh'
}
