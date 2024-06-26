import React from 'react'
import { Button } from 'antd'
import { useCountStore, useCountStore2 } from './store'

const EditModal = () => {
  const count = useCountStore((state) => state.count)
  const count2 = useCountStore2((state) => state.count)
  const increment = useCountStore((state) => state.increment)
  const increment2 = useCountStore2((state) => state.increment)

  const addCount = () => {
    increment(10)
    increment2(15)
  }

  return (
    <>
      <Button type="primary" onClick={addCount}>
        组件点击加count
      </Button>
      <h1>子组件接收过来的数据 count:{count}</h1>
      <h1>子组件接收过来的数据 count2:{count2}</h1>
    </>
  )
}

const ReducerPage: React.FC = () => {
  const count = useCountStore((state) => state.count)
  const increment = useCountStore((state) => state.increment)
  const decrement = useCountStore((state) => state.decrement)

  const addCount = () => {
    increment(10)
  }
  const minusCount = () => {
    decrement(10)
  }

  return (
    <>
      <Button type="primary" onClick={addCount}>
        组件点击加count
      </Button>
      <h1>count:{count}</h1>
      <Button type="primary" onClick={minusCount}>
        组件点击减count
      </Button>
      <br />
      <EditModal />
    </>
  )
}

export default ReducerPage
