/*
 * @Author: yanxiaodi 929213769@qq.com
 * @Date: 2019-01-23 18:08:08
 * @LastEditors: yanxiaodi 929213769@qq.com
 * @LastEditTime: 2019-01-23 18:10:31
 * @Description:
 */
import sum from '../index'

describe("测试", () => {
  test('Add', () => {
    expect(
      sum(1, 2)
    )
      .toBe(3)
  })
})
