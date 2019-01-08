/*
 * @Author: yanxiaodi 929213769@qq.com
 * @Date: 2018-12-07 23:04:32
 * @LastEditors: yanxiaodi 929213769@qq.com
 * @LastEditTime: 2019-01-08 14:37:06
 * @Description: Class => Function
 */
import React from 'react'
import { increment, decrement, reset } from '@/saga/actions'

interface Props {
  count: number,
  dispatch: Function,
}

export default ({ count, dispatch }: Props) =>
  <div>
    <h1> Count: <span>{count}</span> </h1>
    <button onClick={() => dispatch(increment())}> +1 </button>
    <button onClick={() => dispatch(decrement())}> -1 </button>
    <button onClick={() => dispatch(reset())}> Reset </button>
  </div>
