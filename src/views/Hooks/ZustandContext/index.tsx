import React from 'react'
import { Button } from 'antd'

const ButtonChild = () => {
  return (
    <div>
      子组件：
      <Button>加</Button>
    </div>
  )
}

const ReducerPage: React.FC = () => {
  return (
    <>
      父组件：
      <ButtonChild />
    </>
  )
}

export default ReducerPage
