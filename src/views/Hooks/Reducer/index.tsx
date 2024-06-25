import React, { useReducer } from 'react'
import { Input, Button } from 'antd'
import { reducer, initialState } from './store'

const EditModal = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const onClick = () => {
    dispatch({
      type: 'decrement'
    })
  }
  return (
    <>
      <Button type="primary" onClick={onClick}>
        组件点击减count
      </Button>
      <h1>子组件接收过来的数据 count:{state.count}</h1>
    </>
  )
}

const ReducerPage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const onChange = (e: any) => {
    dispatch({
      type: 'setName',
      name: e.target.value
    })
  }
  const onClick = () => {
    dispatch({
      type: 'increment'
    })
  }

  return (
    <>
      <h1>父组件的数据{state.msg}</h1>
      <Button type="primary" onClick={onClick}>
        组件点击加count
      </Button>
      <Input placeholder="输入更新name" onChange={onChange} />
      <h1>父组件显示数据</h1>
      <h1>count:{state.count}</h1>
      <h1>name: {state.name}</h1>
      <EditModal />
    </>
  )
}

export default ReducerPage
