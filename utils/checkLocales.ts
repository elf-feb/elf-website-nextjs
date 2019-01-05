import _ from 'lodash'

export default (locales: any): string => {
  if (_.isString(locales)) {
    if (locales.indexOf('zh') !== -1) { return 'zh_CN' }
    if (locales.indexOf('en') !== -1) { return 'en_US' }
    if (locales.indexOf('fr') !== -1) { return 'fr_FR' }
    if (locales.indexOf('jp') !== -1) { return 'ja_JP' }
  }
  return 'zh_CN'
}
