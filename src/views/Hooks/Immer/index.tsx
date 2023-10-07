import React, { useState } from 'react'
import { Input, Button } from 'antd'
import { reducer, initialState } from './store'
import { useImmer, useImmerReducer } from 'use-immer'

const ReducerPage: React.FC = () => {
  const [state1, setState1] = useState({
    name: 'immer name1',
    todos: { id: 1, text: 'Learn React', completed: true }
  })
  const [state2, setState2] = useImmer({
    name: 'immer name2',
    todos: { id: 2, text: 'Learn use-immer', completed: false }
  })
  const changeTodo1 = () => {
    setState1({
      ...state1,
      todos: {
        ...state1.todos,
        text: `Learn new React${new Date().valueOf()}`
      }
    })
    console.log('state1', state1)
  }
  const changeTodo2 = () => {
    setState2((prevState) => {
      prevState.todos.text = `Learn new use-immer${new Date().valueOf()}`
    })
    console.log('state2', state2)
  }
  const [stateReducer, dispatch] = useImmerReducer(reducer, initialState)
  const changeName = (e: any) => {
    dispatch({
      type: 'setName',
      name: e.target.value
    })
  }
  const addCount = () => {
    dispatch({
      type: 'increment'
    })
  }
  const minusCount = () => {
    dispatch({
      type: 'decrement'
    })
  }

  return (
    <>
      <div>
        <h2>todos1: {state1.todos.text}</h2>
        <h2>todos2: {state2.todos.text}</h2>
      </div>
      <Button type="primary" onClick={changeTodo1}>
        点击更新todo1
      </Button>
      <br />
      <Button type="primary" onClick={changeTodo2}>
        点击更新todo2
      </Button>
      <br />
      <Button type="primary" onClick={addCount}>
        组件点击加count
      </Button>
      <Input placeholder="输入更新name" onChange={changeName} />
      <h1>父组件显示数据</h1>
      <h1>count:{stateReducer.count}</h1>
      <h1>name: {stateReducer.name}</h1>
      <Button type="primary" onClick={minusCount}>
        组件点击减count
      </Button>
    </>
  )
}

export default ReducerPage
