/*
 * @Author: yanxiaodi 929213769@qq.com
 * @Date: 2019-01-05 23:44:03
 * @LastEditors: yanxiaodi 929213769@qq.com
 * @LastEditTime: 2019-01-05 23:49:08
 * @Description:
 */
import intl from 'react-intl-universal'
import _ from 'lodash'

export default (VALUE: string, config: Object = {}): string => _.isString(intl.get(VALUE))
  ? intl.get(VALUE, config)
  : ''
