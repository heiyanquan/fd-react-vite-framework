import React from 'react'
import { Button } from 'antd'
import { useCountStore } from './store'

const EditModal2 = () => {
  const count = useCountStore((state) => state.count)
  const increment = useCountStore((state) => state.increment)

  const addCount = () => {
    increment(10)
  }

  return (
    <>
      <Button type="primary" onClick={addCount}>
        组件点击加count
      </Button>
      <h1>子组件接收过来的数据 count:{count}</h1>
    </>
  )
}

const EditModal1 = () => {
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
    </>
  )
}

const ReducerPage: React.FC = () => {
  return (
    <>
      <EditModal1 />
      <br />
      <EditModal2 />
    </>
  )
}

export default ReducerPage
