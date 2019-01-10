/*
 * @Author: yanxiaodi 929213769@qq.com
 * @Date: 2019-01-06 00:13:49
 * @LastEditors: yanxiaodi 929213769@qq.com
 * @LastEditTime: 2019-01-10 16:51:41
 * @Description: checkLocales.ts
 */
import _ from 'lodash'
import get from 'lodash/get'
import hasIn from 'lodash/hasIn'

export default (param: any | string): string => {
  // param === window.location.hostname
  if (_.isString(param)) {
    const urlLang = _.first(
      _.split(param, '.', 3),
    )

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
    if (locales.indexOf('jp') !== -1) { return 'ja' }
  }
  return 'zh'
}
