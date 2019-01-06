/*
 * @Author: yanxiaodi 929213769@qq.com
 * @Date: 2019-01-06 00:13:49
 * @LastEditors: yanxiaodi 929213769@qq.com
 * @LastEditTime: 2019-01-06 22:53:06
 * @Description: checkLocales.ts
 */
import _ from 'lodash'
import get from 'lodash/get'
import hasIn from 'lodash/hasIn'

export default (req: any): string => {
  if (hasIn(req, 'headers.host') && get(req, 'headers.host') !== '') {
    console.log(
      'checkLocales: locales ===> ',
      get(req, 'headers.host'),
    )

    const locales = get(req, 'headers.host')
    if (locales.indexOf('zh') !== -1) { return 'zh' }
    if (locales.indexOf('en') !== -1) { return 'en' }
    if (locales.indexOf('fr') !== -1) { return 'fr' }
    if (locales.indexOf('jp') !== -1) { return 'ja' }
  }
  return 'zh'
}
